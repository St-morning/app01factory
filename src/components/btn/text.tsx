import { ReactNode } from 'react';
import createButtonDrawer from './create-drawer';

/**
 * 表格使用的按钮，通常为只有文字显示
 */
export default function ButtonText(
	{
		title,
		disabled,
		onClick,
	}: {
			title: ReactNode;
		disabled?: boolean;
		onClick?(): void;
	}) {
	return <>
		<div className="button" onClick={(e) => {
			!disabled && onClick && onClick();
		}}> {title}</div>
		<style jsx>{`
.button {
padding: 0.5rem;
cursor: pointer;
font:normal 400 14px normal;
color:#3F6FF6;
}
		`}</style>
	</>;

}

ButtonText.Drawer = createButtonDrawer(ButtonText);
