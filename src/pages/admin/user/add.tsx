import { useState } from 'react';
import checkRequired from '../../../atoms/check-required';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminUserAdd, { Message as M1, Result as R1 } from '../../api/admin/user/add';

export default function Add({
	onAdded
}: {
	onAdded(): void;
}) {
	const init = {
		userid: '',
		username: '',
		sex: 1,
		phone: '',
		ext: {
			email: '',
			avatar: '',
			idno: '',
		}
	} as M1;

	// 定义一条新用户数据，用来插入
	const [data, setdata] = useState(init);
	return <>
		<Ui.Button.Add
			title='新增用户'
			dlgTitle='新增用户'
			onCancel={() => {
				setdata(init);
			}}
			onOK={async () => {
				checkRequired(data, 'userid', '用户名');
				checkRequired(data, 'username', '姓名');
				await apiAdminUserAdd(data);
				ui.Message.success({
					content: '保存成功',
					closable: true
				});
				onAdded();
				setdata(init);
			}}
		>
			<Ui.Form.Group title='基本信息'>
				<div className="content">
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Ui.Form.Item.Input
								maxLength={11}
								required
								label='用户名'
								placeholder='请输入用户名'
								labelSpan={4}
								value={data.userid}
								onChange={(v) => {
									setdata({
										...data,
										userid: v
									});
								}}
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
								maxLength={10}
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
								value={data.ext.email}
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
								value={data.ext.idno}
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
								fileid={data.ext.avatar}
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
		</Ui.Button.Add>
		<style jsx>{`
.content {
display: flex;
flex-direction: column;
width: 80%;
}
`}</style>
	</>;
}
