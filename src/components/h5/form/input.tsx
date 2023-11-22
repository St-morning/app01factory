import { Input as Base } from '@arco-design/mobile-react';
import { InputProps as Props } from '@arco-design/mobile-react/esm/input';
import '@arco-design/mobile-react/esm/input/style/css/index.css';
import PasswordInput from './password';

export type { InputProps } from '@arco-design/mobile-react/esm/input';

/**
 * 输入框
 * 输入框组件，支持添加前后缀。
 */
export default function Input(props: Props) {
	return <Base {...props} />;
}

/**
 * 密码输入框
 */
Input.Password = PasswordInput;
