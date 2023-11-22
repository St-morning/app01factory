import { Textarea as Base } from '@arco-design/mobile-react';
import { TextareaProps as Props } from '@arco-design/mobile-react/esm/textarea';
import '@arco-design/mobile-react/esm/textarea/style/css/index.css';

/**
 * 多行文本框
 * 多行文本输入框组件，支持自适应内容高度。
 */
export default function Textarea(props: Props) {
	return <Base {...props} />;
}
