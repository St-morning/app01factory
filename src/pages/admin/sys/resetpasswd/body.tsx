import { useRouter } from 'next/router';
import { useState } from 'react';
import Ui from '../../../../components/ui';
import pages from '../../../../atoms/pages';
import checkRequired from '../../../../atoms/check-required';
import Label from './label';
import apiAccountChangePsw from '../../../api/account/change-psw';
import ui from '../../../../atoms/ui';

export default function Body() {
	const router = useRouter();
	const [oldpsw, setoldpsw] = useState('');
	const [newpsw, setnewpsw] = useState('');
	const [againpsw, setagainpsw] = useState('');
	async function onSave() {
		try {
			checkRequired({ oldpsw }, 'oldpsw', '原密码');
			checkRequired({ newpsw }, 'newpsw', '新密码');
			checkRequired({ againpsw }, 'againpsw', '确认新密码');
			if (newpsw !== againpsw) {
				throw new Error('新密码和确认新密码不一致，请检查');
			}
			const res = await apiAccountChangePsw({ newpsw, oldpsw });
			if (res) {
				ui.Message.success({
					content: '密码修改成功',
					closable: true
				});
				setoldpsw('');
				setnewpsw('');
				setagainpsw('');
				await router.push({
					pathname: pages['/account/signin']
				});
			}
		} catch (error) {
			ui.Message.error((error as Error).message);
		}

	}

	return <>
		<Ui.MainContainer
			title='重置密码'
		>
			<div className="content">
				<div className="hint">
					如忘记【原密码】，请联系系统管理员进行密码重置，再修改密码。
				</div>
				<div className="form">
					<div className='formContent'>
						<Ui.Layout.Space direction='vertical' size={'large'}>
							<Ui.Form.Item.Password
								label={<Label>原密码</Label>}
								required
								placeholder='请输入原密码'
								value={oldpsw}
								onChange={(v) => {
									setoldpsw(v);
								}}
							/>
							<Ui.Form.Item.Password
								label={<Label>新密码</Label>}
								required
								placeholder='请输入新密码'
								value={newpsw}
								onChange={(v) => {
									setnewpsw(v);
								}}
							/>
							<Ui.Form.Item.Password
								label={<Label>确认新密码</Label>}
								required
								placeholder='请再次输入新密码'
								value={againpsw}
								onChange={(v) => {
									setagainpsw(v);
								}}
							/>

						</Ui.Layout.Space>
					</div>
				</div>
				<div className="but">
					<Ui.Button.Save onClick={async () => {
						await onSave();
					}} />
				</div>
			</div>
		</Ui.MainContainer>
		<style jsx>{`
.content {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
background-color: #FFF;
}

.hint {
width: 1128px;
height: 52px;
display: flex;
align-items: center;
padding-left:24px ;
color:#BF862D;
font:normal 700 14px/22px normal;
background-color:#FFF9E3 ;
margin-top: 25px;
}

.form {
height: 205px;
margin-top: 112px;
margin-bottom: 83px;
display: flex;
align-content: flex-start;
width: 100%;
}
.formContent{
padding-left: 30%;
}

.oldpasswd {
color:#000;
}

.but {
width: 565px;
display: flex;
justify-content: flex-end;
padding-right: 100px;
}
		`}</style>
	</>;
}
