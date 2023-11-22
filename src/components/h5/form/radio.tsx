import { Radio as Base } from '@arco-design/mobile-react';
import { RadioProps as Props } from '@arco-design/mobile-react/esm/radio';
import '@arco-design/mobile-react/esm/radio/style/css/index.css';

/**
 * 单选框
 * 单选框，可用状态下点击切换选择，支持禁用，支持单选项组。
 */
export default function Radio(props: Props) {
	return <Base {...props} />;
}
