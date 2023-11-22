import { Select, SelectProps } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 下拉选择框
 */
export default function FormItemSelect({
	label,
	required,
	labelAfter,
	labelSpan,
	labelAfterSpan,
	separator,
	labelValign = 'center',
	...rest
}: SelectProps & IFormItemProps) {
	return <FormItem
		required={required}
		label={label}
		labelAfter={labelAfter}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
		labelValign={labelValign}
	><Select
			allowClear
			style={{ width: '100%' }}
			{...rest}
		/></FormItem>;
}

FormItemSelect.Option = Select.Option;
FormItemSelect.OptGroup = Select.OptGroup;
