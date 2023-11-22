import { Radio } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 性别选择
 */
export default function FormItemSex({
	value,
	required,
	disabled,
	onChange,
	...itemProps
}: {
	value: 0 | 1 | 2 | number;
	disabled?: boolean;
	onChange?(value: 0 | 1 | 2): void;
} & IFormItemProps) {
	return <FormItem {...itemProps}><Radio.Group
		disabled={disabled}
		style={{ width: '100%' }}
		value={value}
		onChange={onChange}
	>
		{/* <Radio value={0} >未知</Radio> */}
		<Radio value={1} >男</Radio>
		<Radio value={2} >女</Radio>
	</Radio.Group>
	</FormItem>;
}
