import Ui from '../../../../components/ui';

export default function SysName({
	value,
	onChange
}: {
	value: string;
	onChange(value: string): void;
}) {
	const name = value;
	return <Ui.Form.Item.Input
		label='系统名称'
		placeholder='请输入系统名称'
		value={name}
		onChange={onChange}
		maxLength={20}
		required
	/>;
}
