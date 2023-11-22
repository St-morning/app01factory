import Ui from '../../../components/ui';

type IProps = {
	onSearch(value: string): void;
};

/**
 * 下拉框选项，下拉状态有 ：0 停用 ，1 启用 
 */
export default function SelectSearch({ onSearch }: IProps) {
	const status = [
		{
			value: '1',
			status: '启用'
		},
		{
			value: '0',
			status: '停用'
		},
	];
	return <>
		{/* 下拉框 */}
		<Ui.Form>
			<Ui.Form.Row>
				<Ui.Form.Column>
					<Ui.Form.Item.Select
						label='状态'
						placeholder='全部'
						labelSpan={5}
						onChange={(v) => {
							onSearch(v);
						}}
					>
						{status.map((v) => {
							return <Ui.Form.Item.Select.Option value={v.value} key={v.value}>
								{v.status}
							</Ui.Form.Item.Select.Option>;
						})}
					</Ui.Form.Item.Select>
				</Ui.Form.Column>
			</Ui.Form.Row>
		</Ui.Form>
	</>;
}
