import { Input, InputProps, Message } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 手机号
 */
export default function FormItemPhoneNo({
	label,
	labelAfter,
	required,
	labelValign,
	labelSpan,
	labelAfterSpan,
	separator,
	disabled,
	onChange,
	...itemProps
}: {
	onChange?(value: string): void;
} & InputProps & IFormItemProps) {
	return <FormItem
		label={label === undefined ? '手机号' : label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	><Input
			allowClear
			disabled={disabled}
			placeholder='请输入手机号'
			style={{ width: '100%' }}
			maxLength={11}
			onChange={(v) => {
				if (!onChange) {
					return;
				}
				if (v) {
					const temp = parseInt(v);
					if (temp && temp > 0 && temp < 19999999999) {
						onChange(v.toString());
					}
				} else {
					onChange('');
				}
			}}
			onBlur={(v) => {
				const val = v.target.value;
				if (!/1\d{10}/.test(val)) {
					Message.error('手机号格式不合法');
				}
			}}
			{...itemProps}
		/>
	</FormItem>;
}
