import { Input, Message } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 邮箱
 */
export default function FormItemEmail({
	value,
	disabled,
	onChange,
	...itemProps
}: {
	value?: string;
	disabled?: boolean;
	onChange?(value: string): void;
} & IFormItemProps) {
	return <FormItem label='邮箱' {...itemProps}><Input
		allowClear
		disabled={disabled}
		placeholder='请输入邮箱'
		style={{ width: '100%' }}
		value={value}
		maxLength={20}
		onChange={(v) => {
			if (!onChange) {
				return;
			}
			const temp = /[0-9a-zA-Z@]{1,20}/;
			if (temp.test(v)) {
				onChange(v);
			} else {
				onChange('');
			}
		}}
		onBlur={(v) => {
			const val = v.target.value;
			if (!/^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)+$/.test(val)) {
				Message.error('邮箱格式不合法');
			}
		}}
	/>
	</FormItem>;
}
