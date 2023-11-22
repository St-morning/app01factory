import { useState } from 'react';
import apiAdminGroupModify, { Message as M1, Result as R1 } from '../../api/admin/group/modify';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';

export default function Edit({
	data: init,
	onChange,
}: {
	data: M1;
	onChange(): void;
}) {
	// 输入框数据源
	const [data, setdata] = useState(init);
	return <>
		{/* 抽屉弹窗 */}
		<Ui.Button.Edit
			title='编辑'
			dlgTitle='组别管理'
			onCancel={() => {
				setdata(init);
			}}
			onOK={async () => {
				await apiAdminGroupModify(data);
				ui.Message.success('保存成功');
				onChange();
				setdata(init);
			}}
		>
			<Ui.Form>
				<Ui.Form.Group
					title='基本信息'
				>
					<Ui.Form.Row>
						<Ui.Form.Column span={14}>
							<Ui.Form.Item.Input
								label='组别名称'
								value={data.groupname}
								onChange={(val) => {
									setdata({
										...data,
										groupname: val
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
			</Ui.Form>
		</Ui.Button.Edit>
		<style jsx>{`
				.select{
margin-left:3.5rem;
}
		`}</style>
	</>;
}
