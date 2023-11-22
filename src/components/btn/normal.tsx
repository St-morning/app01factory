import { Button } from '@arco-design/web-react';
import { ReactNode } from 'react';
import createButtonDrawer from './create-drawer';

/**
 * 按钮
 */
export default function ButtonNormal({
	title,
	disabled,
	onClick
}: {
	title: ReactNode;
	disabled?: boolean;
	onClick?(): void;
}) {
	return <Button disabled={disabled} onClick={onClick} >{title}</Button>;
};

ButtonNormal.Drawer = createButtonDrawer(ButtonNormal);
