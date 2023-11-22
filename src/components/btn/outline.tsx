import { Button as ButtonBase, Message } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import createButtonDrawer from './create-drawer';
import ButtonIcon from './icon';

/**
 * 带外边框的按钮
 */
export default function ButtonOutline({
	title,
	icon,
	disabled,
	onClick,
}: {
	icon?: string;
	title?: ReactNode;
	disabled?: boolean;
	onClick?(): Promise<void> | void;
}) {
	const [loading, setloading] = useState(false);
	return <ButtonBase
		loading={loading}
		style={{
			paddingLeft: 0,
			paddingRight: 0,
		}}
		disabled={disabled}
		onClick={async () => {
			setloading(true);
			try {
				onClick && await onClick();
			} catch (error) {
				Message.error((error as Error).message);
			} finally {
				setloading(false);
			}
		}}><ButtonIcon title={title} icon={icon} /></ButtonBase>;
}

ButtonOutline.Drawer = createButtonDrawer(ButtonOutline);
