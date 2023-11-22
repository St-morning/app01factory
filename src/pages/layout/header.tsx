import pages from '../../atoms/pages';
import res from '../../atoms/res';
import Ui from '../../components/ui';
import ResetPassword from './reset-password';

export default function Header({
	appname,
	username,
	avatar,
	rolename
}: {
	appname: string;
	username: string;
	rolename: string;
	avatar: string;
}) {
	return <>
		<div className='user'>
			<span className='userlbl'>{`欢迎进入${appname}后台`}</span>
			{username === undefined ?
				<div className='row'>
					<Ui.Link className='row' href={pages['/account/signin']} >
						请登录
					</Ui.Link>
				</div>
				:
				<div className='row'>
					<ResetPassword avatar={avatar} username={username} rolename={rolename} />
					<Ui.Link className='row' href={pages['/account/signout']} >
						<div className="content">
							<img className='outimg' src={res['/images/sys/logout.png']} />
							<span className='outlbl' >退出登录</span>
						</div>
					</Ui.Link>
				</div>
			}
		</div>
		<style jsx>{`
.user{
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
height: 3.75rem;
padding-left: 1rem;
padding-right: 4rem;
box-shadow: 0.2rem 0.2rem 0.3rem #e0e0e0;
flex-grow: 0;
flex-shrink: 0;
}
.userlbl{
cursor: pointer;
color: #1D2129;
font-size: 0.8125rem;
}
.row{
display: flex;
flex-direction: row;
align-items: center;
}
.content {
display: flex;
align-items: center;
}
.outimg{
cursor: pointer;
height: 1.25rem;
width: 1.25rem;
margin-left: 2rem;
}
.outlbl{
margin-left: 0.2rem;
cursor: pointer;
color: #000000;
font-size: 0.875rem;
}
`}</style>
	</>;
}
