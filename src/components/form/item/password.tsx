import { Input, InputProps } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 密码框
 */
export default function FormItemPassword({
	label,
	labelAfter,
	required,
	labelValign,
	labelSpan,
	labelAfterSpan,
	separator,
	...itemProps
}: InputProps & IFormItemProps) {
	const { style, ...props } = itemProps;
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	><Input.Password
			{...props}
			maxLength={20}
			allowClear
			style={{
				width: '100%',
				...style
			}}
		/>
	</FormItem>;
}
