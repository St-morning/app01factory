import { ActionSheet as Base } from '@arco-design/mobile-react';
import { ActionSheetProps as Props } from '@arco-design/mobile-react/esm/action-sheet';
import '@arco-design/mobile-react/esm/action-sheet/style/css/index.css';
import { ReactNode, useState } from 'react';

/**
 * 打开动作面板
 */
export default function ActionSheet({ children, ...props }: Omit<Props, 'close' | 'visible'> & {
	children?: ReactNode;
}) {
	const [visible, setvisible] = useState(false);
	return <>
		<span onClick={() => {
			setvisible(!visible);
		}}>{children}</span>
		<Base
			{...props}
			// onClose={() => {
			// 	setvisible(false);
			// }}
			visible={visible}
			close={() => {
				setvisible(false);
			}}
		/>
	</>;
}
