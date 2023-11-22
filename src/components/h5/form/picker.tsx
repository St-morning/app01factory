import { Picker as Base } from '@arco-design/mobile-react';
import { PickerProps as Props } from '@arco-design/mobile-react/esm/picker';
import '@arco-design/mobile-react/esm/picker/style/css/index.css';
import '@arco-design/mobile-react/esm/picker-view/style/css/index.css';
import { ReactNode, useState } from 'react';

/**
 * 选择器
 * 选择器组件，形式是弹起的浮层。
 */
export default function Picker({ children, onHide, ...props }: Props & {
	children?: ReactNode;
}) {
	const [visible, setvisible] = useState(false);
	return <>
		<span onClick={() => {
			setvisible(!visible);
		}}>{children}</span>
		<Base
			maskClosable
			touchToStop
			{...props}
			// onClose={() => {
			// 	setvisible(false);
			// }}
			visible={visible}
			onHide={(scene) => {
				setvisible(false);
				onHide && onHide(scene);
			}}
		/>
	</>;
}
