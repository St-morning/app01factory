import { useState } from 'react';
import checkRequired from '../../../atoms/check-required';
import apiAdminRoleAdd, { Message as M1, Result as R1 } from '../../api/admin/role/add';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';

export default function Add({
	onChange
}: {
	onChange(): void;
}) {
	// 新增数据
	const addquery = {
		rolename: '',
		description: ''
	} as M1;
	const [data, setdata] = useState(addquery);
	return <>
		<Ui.Button.Add
			title='新增角色'
			dlgTitle='角色管理'
			onOK={async () => {
				checkRequired(data, 'rolename', '角色名称');
				// 调用保存服务，将新增的数据保存
				await apiAdminRoleAdd(data);
				// 保存服务，保存成功-tip
				ui.Message.success({
					content: '保存成功',
					closable: true
				});
				// 清空数据
				setdata(addquery);
				onChange();
			}}
		>
			<Ui.Form>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<Ui.Form.Item.Input
							required
							labelSpan={4}
							maxLength={20}
							label='角色名称'
							value={data.rolename}
							onChange={(v) => {
								setdata({ ...data, rolename: v });
							}}
							placeholder={'请输入名称'}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<Ui.Form.Item.TextArea
							label={'角色描述'}
							labelSpan={4}
							placeholder={'请输入描述'}
							autoSize={true}
							maxLength={300}
							value={data.description}
							onChange={(v) => {
								setdata({ ...data, description: v });
							}}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
			</Ui.Form>
		</Ui.Button.Add>
	</>;
}
