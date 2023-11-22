import pages from '../../atoms/pages';
import res from '../../atoms/res';
import getfile from '../../atoms/getfile';
import Ui from '../../components/ui';

export default function ResetPassword({
	avatar,
	username,
	rolename
}: {
	avatar: string;
	username: string;
	rolename: string
}) {
	const img = (() => {
		if (avatar) {
			return getfile(avatar);
		}
		return res['/images/sys/avatar.png'];
	})();
	return <>
		{<div className='row'>
			<Ui.Button.Menu
				title={<span className='lbl'>
					<img className='img' src={img} />
					{username}{`(${rolename || '无'})`}</span>
				}
				menus={[{
					title: <div className='lbut'>
						<img src={res['/images/sys/switchuser.png']} alt="切换角色" className="selectu" />
						<span className="text">切换角色</span>
					</div>,
					url: pages['/account/rolechoose']
				}, {
					title: <div className='lbutd'>
						<img src={res['/images/sys/repass.png']} alt="修改密码" className="selectu" />
						<span className="textd">修改密码</span>
					</div>,
					url: pages['/admin/sys/resetpasswd']
				}]}
			/>
		</div>}

		<style jsx>{`
.img{
height: 2rem;
width: 2rem;
margin-left: 0.5rem;
margin-right: .5rem;
border-radius: 3.125rem;
}
.row{
display: flex;
flex-direction: row;
align-items: center;
}
.lbl{
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
margin-left: 0.5rem;
font-size: 0.875rem;
}

.lbut {
width: 137px;
height: 40px;
display: flex;
align-items: center;
background-color: #3F6FF6;
}

.lbutd {
display: flex;
align-items: center;
}

.selectu {
width: 21px;
height: 21px;
margin-left: 16px;
margin-right: 12px;
}
.text {
color:#FFF;
}

.textd {
color:#000;
}
`}</style>
	</>;
}
