import { Checkbox as Base } from '@arco-design/mobile-react';
import { CheckboxProps as Props } from '@arco-design/mobile-react/esm/checkbox';
import '@arco-design/mobile-react/esm/checkbox/style/css/index.css';

/**
 * 复选框
 * 可用状态下点击切换选择，支持禁用，支持复选项组。
 */
export default function Checkbox(props: Props) {
	return <Base {...props} />;
}
