import { Drawer, DrawerProps, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';

/**
 * 带有右侧抽屉框的按钮
 */
export default function createButtonDrawer(Button: (props: {
	title: ReactNode;
	onClick?(): void;
	disabled?: boolean;
}) => JSX.Element) {
	return ({
		title,
		dlgTitle,
		children,
		disabled,
		onOK,
		onCancel,
		drawerWidth = '36rem',
		...props
	}: {
		title: ReactNode;
		dlgTitle: ReactNode;
		children: ReactNode;
		disabled?: boolean;
		onOK?(): Promise<void> | void;
		onCancel?(): Promise<void> | void;
		drawerWidth?: string;
	} & DrawerProps) => {
		const [visible, setvisible] = useState(false);
		const [buzy, setbuzy] = useState(false);
		return <>
			<Button
				title={title}
				disabled={disabled}
				onClick={() => {
					setvisible(true);
				}}
			/>
			<Drawer
				title={dlgTitle}
				width={drawerWidth}
				closable={false}
				visible={visible}
				onOk={async () => {
					setbuzy(true);
					try {
						onOK && await onOK();
						setvisible(false);
					} catch (error) {
						Message.error({
							content: (error as Error).message,
							closable: true
						});
					}
					finally {
						setbuzy(false);
					}
				}}
				onCancel={async () => {
					onCancel && await onCancel();
					setvisible(false);
				}}
				confirmLoading={buzy}
				{...props}
			>
				{children}
			</Drawer>
		</>;
	};
}
