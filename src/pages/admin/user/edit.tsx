import { useEffect, useState } from 'react';
import apiAdminUserGetuser, { Message as M1, Result as R1 } from '../../api/admin/user/getuser';
import checkRequired from '../../../atoms/check-required';
import apiAdminUserSave, { Message as M2, Result as R2 } from '../../api/admin/user/save';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';

export default function Edit({
	userid,
	onClick
}: {
	userid: string;
	onClick(): void;
}) {
	// 定义编辑后的数据
	const [data, setdata] = useState({} as R1);
	const [init, setinit] = useState({} as R1);

	useEffect(() => {
		void (async () => {
			const data = await apiAdminUserGetuser({
				userid
			});
			setdata(data);
			setinit(data);
		})();
	}, [userid]);

	return <>
		<Ui.Button.Edit
			title='编辑'
			dlgTitle='用户管理-编辑'
			onCancel={() => {
				setdata(init);
			}}
			onOK={async () => {
				checkRequired(data, 'userid', '用户名');
				checkRequired(data, 'username', '姓名');
				// 调用编辑服务
				await apiAdminUserSave(data);
				ui.Message.success({
					content: '保存成功',
					closable: true
				});
				onClick();
			}}
		>
			<Ui.Form.Group title='基本信息'>
				<div className="content">
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Text
								label='用户名:'
								value={data.userid}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Input
								required
								label='姓名'
								placeholder='请输入姓名'
								value={data.username}
								labelSpan={4}
								maxLength={11}
								onChange={(v) => {
									setdata({
										...data,
										username: v
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Radio
								label='性别'
								labelSpan={4}
								value={data.sex}
								onChange={(v) => {
									setdata({
										...data,
										sex: v
									});
								}}
							>
								<Ui.Form.Item.Radio.Item value={1} >男</Ui.Form.Item.Radio.Item>
								<Ui.Form.Item.Radio.Item value={2} >女</Ui.Form.Item.Radio.Item>
							</Ui.Form.Item.Radio>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.PhoneNo
								labelSpan={4}
								value={data.phone}
								onChange={(v) => {
									setdata({
										...data,
										phone: v
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Email
								labelSpan={4}
								value={data.ext?.email}
								onChange={(v) => {
									setdata({
										...data,
										ext: {
											...data.ext,
											email: v
										}
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.ID
								labelSpan={4}
								value={data.ext?.idno}
								onChange={(v) => {
									setdata({
										...data,
										ext: {
											...data.ext,
											idno: v
										}
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Avatar
								labelSpan={4}
								fileid={data.ext?.avatar}
								onChange={(v) => {
									setdata({
										...data,
										ext: {
											...data.ext,
											avatar: v
										}
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</div>
			</Ui.Form.Group>
		</Ui.Button.Edit>
		<style jsx>{`
.content {
display: flex;
flex-direction: column;
width: 80%;
}
`}</style>
	</>;
}
