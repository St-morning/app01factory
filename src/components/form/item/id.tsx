import { Input, Message } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 身份证
 */
export default function FormItemID({
	value,
	placeholder,
	maxLength,
	disabled,
	onChange,
	onPressEnter,
	style,
	...itemProps
}: {
	value?: string;
	placeholder?: string;
	maxLength?: number | {
		length: number;
		errorOnly?: boolean;
	};
	disabled?: boolean;
	style?: CSSProperties;
	onChange?(value: string): void;
	onPressEnter?(): void;
} & IFormItemProps) {
	return <FormItem label='身份证' {...itemProps}><Input
		allowClear
		disabled={disabled}
		placeholder={placeholder}
		style={{
			width: '100%',
			...style
		}}
		value={value}
		maxLength={maxLength}
		onPressEnter={onPressEnter}
		onChange={(v) => {
			if (!onChange) {
				return;
			}
			const temp = /[0-9Xx]{1,18}/;
			if (temp.test(v)) {
				onChange(v);
			} else {
				onChange('');
			}
		}}
		onBlur={(v) => {
			const val = v.target.value;
			// let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
			// let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
			if (!/^(([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|(([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3})$/.test(val)) {
				Message.error('身份证格式不合法');
			}
		}}
	/>
	</FormItem>;
}
