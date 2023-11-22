import { Radio } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 单选框
 */
export default function FormItemRadio<T>({
	value,
	options,
	disabled,
	onChange,
	children,
	...itemProps
}: {
	value: T;
	options?: Array<{
		label: string;
		value: T;
	}>;
	children?: ReactNode;
	disabled?: boolean;
	onChange?(value: T): void;
} & IFormItemProps) {
	return <FormItem {...itemProps}><Radio.Group
		disabled={disabled}
		style={{ width: '100%' }}
		value={value}
		onChange={onChange}
	>
		{options ? options.map((option) => {
			return <Radio key={JSON.stringify(option.value)} value={option.value} >{option.label}</Radio>;
		}) : children}
	</Radio.Group>
	</FormItem>;
}

FormItemRadio.Item = Radio;
