import { useState } from 'react';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminRoleUpdate, { Message as M2, Result as R2 } from '../../api/admin/role/update';

export default function Edit({
	data: initData,
	onEdit
}: {
	data: M2;
	onEdit(): void;
}) {
	// 返回的数据
	const [data, setdata] = useState(initData);
	return <>
		<Ui.Button.Edit
			title='编辑'
			dlgTitle='角色管理'
			onOK={async () => {
				await apiAdminRoleUpdate(data);
				ui.Message.success('保存成功');
				onEdit();
			}}
		>
			{/* gas组件使用demo */}
			<Ui.Form>
				<Ui.Form.Group title='基本信息'>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Input
								labelSpan={4}
								label='角色名称'
								value={data.rolename}
								onChange={(v) => {
									setdata({
										...data,
										rolename: v
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.TextArea
								label='角色描述'
								labelSpan={4}
								value={data.description}
								placeholder={'请输入'}
								maxLength={300}
								onChange={(v) => {
									setdata({
										...data,
										description: v
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
			</Ui.Form>
		</Ui.Button.Edit >
	</>;
}
