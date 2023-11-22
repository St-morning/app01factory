import { Input, InputProps } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';
import FormItemInputNumber from './number';
import FormItemID from './id';

/**
 * 输入框
 */
export default function FormItemInput({
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
	><Input
			{...props}
			allowClear
			style={{
				width: '100%',
				...style
			}}
		/>
	</FormItem>;
}

/**
 * 数字输入框
 */
FormItemInput.Number = FormItemInputNumber;

/**
 * 搜索框
 */
FormItemInput.Search = Input.Search;

/**
 * 身份证
 */
FormItemInput.ID = FormItemID;
