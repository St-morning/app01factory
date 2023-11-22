import { Checkbox, CheckboxProps } from '@arco-design/web-react';

/**
 * 复选框
 */
export default function FormItemCheckbox({ style, ...props }: CheckboxProps) {
	return <Checkbox
		style={{
			width: '100%',
			...style
		}}
		{...props}
	/>;
}
