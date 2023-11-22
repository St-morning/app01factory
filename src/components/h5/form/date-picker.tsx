import { DatePicker as Base } from '@arco-design/mobile-react';
import { DatePickerProps as Props } from '@arco-design/mobile-react/esm/date-picker';
import '@arco-design/mobile-react/esm/picker/style/css/index.css';
import '@arco-design/mobile-react/esm/picker-view/style/css/index.css';
import '@arco-design/mobile-react/esm/date-picker/style/css/index.css';
import { ReactNode, useState } from 'react';

/**
 * 日期时间选择器
 * 日期时间选择器，基于`Picker`组件扩展，支持指定范围，单位可精确到秒。
 */
export default function DatePicker({ children, onHide, ...props }: Props & {
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
