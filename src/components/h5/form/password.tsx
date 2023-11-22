import { Input as Base } from '@arco-design/mobile-react';
import { InputProps as Props } from '@arco-design/mobile-react/esm/input';
import '@arco-design/mobile-react/esm/input/style/css/index.css';

export type { InputProps } from '@arco-design/mobile-react/esm/input';

/**
 * 密码输入框
 * 输入框组件，支持添加前后缀。
 */
export default function PasswordInput(props: Props) {
	return <Base
		type='password'
		placeholder='请输入您的密码'
		{...props}
	/>;
}
