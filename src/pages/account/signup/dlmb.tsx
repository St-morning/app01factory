import { useState } from 'react';
import goto from '../../../atoms/goto';
import pages from '../../../atoms/pages';
import ui from '../../../atoms/ui';
import Link from '../../../components/link';
import Ui from '../../../components/ui';
import apiAccountSiginupZhuce, { Message as M1, Result as R1 } from '../../api/account/siginup/zhuce';
import apiAccountSiginupJchzhhm, { Message as M2, Result as R2 } from '../../api/account/siginup/jchzhhm';

type UserData = M1 & {
	password2: string;
}

/**
 * 登录面板
 */
export default function Dlmb() {
	const [data, setdata] = useState({} as UserData);
	return <>
		<div className='loginv'>
			<Ui.Form>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<Ui.Form.Item.Input
							label='账号'
							labelSpan={4}
							maxLength={20}
							placeholder='请输入账号'
							value={data.userid}
							onChange={(val) => {
								setdata({
									...data,
									userid: val
								});
							}}
							onBlur={async () => {
								if (data.userid) {
									try {
										await apiAccountSiginupJchzhhm(data);
									} catch (error) {
										ui.Message.showError(error);
									}
								}
							}}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<Ui.Form.Item.Password
							label='密码'
							labelSpan={4}
							placeholder='请输入密码'
							value={data.password}
							onChange={(val) => {
								setdata({
									...data,
									password: val,
									password2: ''
								});
							}}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<Ui.Form.Item.Password
							label='确认密码'
							labelSpan={4}
							placeholder='请再次输入密码'
							value={data.password2}
							onChange={(val) => {
								setdata({
									...data,
									password2: val
								});
							}}
							onBlur={() => {
								if (data.password && data.password2 && data.password !== data.password2) {
									ui.Message.error('两次输入的密码不一致');
								}
							}}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
				<div className={'denglu'}>
					<Link href={pages['/account/signin']}>已有帐号,去登录</Link>
				</div>
				<input type='button' value='注    册' className='btn' onClick={async () => {
					try {
						await apiAccountSiginupZhuce(data);
						await goto(pages['/account/signin']);
					} catch (error) {
						ui.Message.showError(error);
					}
				}} />
			</Ui.Form>
			<style jsx>{`
{/* 前缀 */}
.qianzhui{
display: inline-block;
width: 3rem;
}
{/* 登录 */}
.denglu{
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
font:normal 1rem normal;
}
.loginv{
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
}
.inpv{
display: flex;
height: 45px;
width: 100%;
align-items: center;
border: 0.06rem solid #8692A6;
border-radius: 0.375rem;
margin: 10px 0;
}
.inp{
width: 100%;
border-style: none;
margin-left: 0.2rem;
font-size: 0.875rem;
font-weight: 290;
}
.btn{
height: 49px;
width: 100%;
cursor: pointer;
text-align: center;
background-color: #1565D8;
color: #FFFFFF;
font:normal 400 24px/30px normal;
border-radius: 0.375rem;
border-style: none;
margin-top: 10px;
}
			`}</style>
		</div>
	</>;
}
