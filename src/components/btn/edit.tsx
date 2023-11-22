import { Drawer, DrawerProps, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import FormButton from '../table/btn';
import Form from '../form/form';

/**
 * 编辑按钮
 */
export default function ButtonEdit({
	title = '编 辑',
	dlgTitle = '编 辑',
	children,
	onOK,
	onCancel,
	drawerWidth = '36rem',
	...props
}: {
	title?: ReactNode;
	dlgTitle?: ReactNode;
	children: ReactNode;
	drawerWidth?: string;
	onOK?(): Promise<void> | void;
	onCancel?(): Promise<void> | void;
} & DrawerProps) {
	const [visible, setvisible] = useState(false);
	const [buzy, setbuzy] = useState(false);
	return <>
		<FormButton title={title} onClick={() => {
			setvisible(true);
		}} />
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
			<Form>
				{children}
			</Form>
		</Drawer>
	</>;
}
