import { useState } from 'react';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminGroupAdd, { Data as D1, Message as M1, Result as R1 } from '../../api/admin/group/add';

export default function Add({
	onChange
}: {
	onChange(): void;
}
) {
	const [data, setdata] = useState({} as M1);
	return <>
		<Ui.Button.Add
			title='新增组别'
			dlgTitle='组别管理'
			onOK={async () => {
				if (!data.groupname) {
					ui.Message.error('组别名为必填项,请填写完整');
					return;
				}
				await apiAdminGroupAdd(data);
				ui.Message.success('保存成功');
				setdata({} as M1);
				onChange();
			}}
			onCancel={() => {
				setdata({} as M1);
			}}
		>
			<Ui.Form>
				<Ui.Form.Group title='基本信息'>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Input
								required
								labelSpan={4}
								maxLength={10}
								label='组别名称'
								value={data.groupname}
								placeholder={'请输入名称'}
								onChange={(v) => {
									setdata({ ...data, groupname: v });
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
			</Ui.Form>
		</Ui.Button.Add>
	</>;
}
