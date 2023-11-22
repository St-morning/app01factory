import { Drawer, DrawerProps, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';

/**
 * 带有右侧抽屉框的按钮
 */
export default function ButtonDrawer({
	title,
	dlgTitle,
	dlgContent,
	onOK,
	onCancel,
	disabled,
	drawerWidth = '36rem',
	...props
}: {
	title: ReactNode;
	dlgTitle: ReactNode;
	dlgContent: ReactNode;
	onOK?(): Promise<void> | void;
	onCancel?(): Promise<void> | void;
	disabled?: boolean;
	drawerWidth?: string;
} & DrawerProps) {
	const [visible, setvisible] = useState(false);
	const [buzy, setbuzy] = useState(false);
	return <>
		<span className='btn' onClick={() => {
			if (disabled) {
				return;
			}
			setvisible(true);
		}}>{title}</span>
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
			<span>
				{dlgContent}
			</span>
		</Drawer>
		<style jsx>{`
.btn{
cursor: pointer;
font:normal 400 14px normal;
color:#3F6FF6;
}
.btn:hover{
}
`}</style>
	</>;
}
