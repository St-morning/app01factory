import { Button as ButtonBase, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import createButtonDrawer from './create-drawer';

/**
 * 保存按钮，带禁用效果
 */
export default function ButtonSave({
	title = '保 存',
	disabled,
	onClick,
}: {
	disabled?: boolean;
	title?: ReactNode;
	onClick?(): Promise<void> | void;
}) {
	const [loading, setloading] = useState(false);
	return <ButtonBase
		disabled={disabled}
		loading={loading}
		type='primary'
		onClick={async () => {
			setloading(true);
			try {
				onClick && await onClick();
			} catch (error) {
				Message.error((error as Error).message);
			} finally {
				setloading(false);
			}
		}}>{title}</ButtonBase>;
}

ButtonSave.Drawer = createButtonDrawer(ButtonSave);
