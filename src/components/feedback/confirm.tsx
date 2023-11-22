import { Popconfirm, PopconfirmProps } from '@arco-design/web-react';
import { ReactNode, RefAttributes } from 'react';
import ui from '../../atoms/ui';

export default function Confirm({ onOk, onCancel, ...props }: PopconfirmProps & {
	children?: ReactNode;
} & RefAttributes<unknown>) {
	return <Popconfirm
		focusLock
		okText='确认'
		cancelText='取消'
		{...props}
		onOk={async (e) => {
			if (onOk) {
				try {
					await onOk(e);
				} catch (error) {
					ui.Message.showError(error);
				}
			}
		}}
		onCancel={async (e) => {
			if (onCancel) {
				try {
					// eslint-disable-next-line @typescript-eslint/await-thenable
					await onCancel(e);
				} catch (error) {
					ui.Message.showError(error);
				}
			}
		}}
	/>;
}
