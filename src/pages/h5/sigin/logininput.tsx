
import { useRouter } from 'next/router';
import { useState } from 'react';
import pages from '../../../atoms/pages';
import ui from '../../../atoms/ui';
import H5 from '../../../components/h5';
import apiAccountsigin, { Message as M1 } from '../../api/account/sigin';

export default function Logininput({
	redirect
}: {
	redirect: string;
}) {
	const init = {
		userid: '',
		password: ''
	} as M1;
	// 账号密码
	// admin
	// 123456
	const router = useRouter();
	const [user, setuser] = useState(init);
	// 登录
	async function doLogin() {
		//账号验证
		if (!user.userid) {
			ui.Message.error({
				content: '账号不能为空！',
			});
			return;
		}
		//密码验证
		if (!user.password) {
			ui.Message.error({
				content: '密码不能为空！',
				closable: true
			});
			return;
		}
		//验证通过，调用登录服务
		try {
			const data = await apiAccountsigin(user);
			if (data) {
				await router.push(redirect || pages['/h5/home']);
			}
		} catch (error) {
			ui.Message.error({
				content: (error as Error).message,
				closable: true
			});
		}
	}
	const colorConfig = {
		normal: '#D89677',
		active: '#D89677',
		disabled: '#FBACA3',
	};
	return <>
		<H5.Layout.Row>
			<H5.Layout.Column>
				<H5.Input
					border="none"
					maxLength={20}
					placeholder='请输入用户名'
					onChange={(e, val) => {
						setuser({ ...user, userid: val });
					}}
				/>
			</H5.Layout.Column>
			<H5.Layout.Column>
				<H5.Input.Password
					border="none"
					value={user.password}
					onChange={(e, val) => {
						setuser({ ...user, password: val });
					}}
				/>
			</H5.Layout.Column>
		</H5.Layout.Row>
		<H5.Layout.Row>
			<H5.Layout.Column span={24}>
				<div className='forget'>忘记密码？</div>
			</H5.Layout.Column>
		</H5.Layout.Row>
		<H5.Layout.Row>
			<H5.Layout.Column>
				<H5.Button
					bgColor={colorConfig}
					borderColor={colorConfig}
					onClick={doLogin}>登录</H5.Button>
			</H5.Layout.Column>
		</H5.Layout.Row>
		<style jsx>{`
.forget{
/* 忘记密码？ */
font-family: AlibabaPuHuiTiR;
font-size: 12px;
font-weight: normal;
line-height: 16px;
color: #646466;
margin: 0.5rem 0.3rem;
}
`}</style>
	</>;
}

