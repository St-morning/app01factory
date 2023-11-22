import { InputNumber, InputNumberProps } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 数字输入框
 */
export default function FormItemInputNumber({
	label,
	labelAfter,
	required,
	labelValign,
	labelSpan,
	labelAfterSpan,
	separator,
	...props
}: InputNumberProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	><InputNumber
			style={{ width: '100%' }}
			{...props}
		/>
	</FormItem>;
}
