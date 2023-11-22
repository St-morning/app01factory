import { Drawer, DrawerProps, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import res from '../../atoms/res';
import Btnicon from './icon';
import FormColumn from '../form/column';

/**
 * 新增按钮
 */
export default function ButtonAdd({
	title = '新 增',
	dlgTitle,
	children,
	onOK,
	onCancel,
	drawerWidth = '36rem',
	...props
}: {
	title?: ReactNode;
	dlgTitle: ReactNode;
	children: ReactNode;
	drawerWidth?: string;
	onOK?(): Promise<void> | void;
	onCancel?(): Promise<void> | void;
} & DrawerProps) {
	const [visible, setvisible] = useState(false);
	const [buzy, setbuzy] = useState(false);
	return <>
		<Btnicon title={title} icon={res['/images/add.png']} onClick={() => {
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
			<FormColumn>
				{children}
			</FormColumn>
		</Drawer>
	</>;
}
