import { Input, TextAreaProps } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 多行输入框
 */
export default function FormItemTextArea({
	label,
	labelAfter,
	required,
	labelValign = 'start',
	labelSpan,
	labelAfterSpan,
	separator,
	...props
}: TextAreaProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	><Input.TextArea
			allowClear
			style={{
				width: '100%',
				minHeight: '8rem'
			}}
			autoSize
			showWordLimit
			{...props}
		/>
	</FormItem>;
}
