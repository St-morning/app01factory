import pages from '../../../atoms/pages';
import res from '../../../atoms/res';
import apiAccountRolechooseSwitchRole, { Data as D1, Message as M1, Result as R1 } from '../../api/account/rolechoose/switch-role';
import ui from '../../../atoms/ui';
import urls from '../../../atoms/urls';
import { SysUserGetRolesResult } from '../../api/controllers/sys/user';

export default function Body({
	data,
	redirect
}: {
	data: SysUserGetRolesResult;
	redirect: string;
}) {

	async function saveCookie(roleid: string, rolename: string) {
		try {
			await apiAccountRolechooseSwitchRole({
				roleid,
				rolename
			});
			// await router.push({
			// 	pathname: pages['/account/pagejump'],
			// 	query: {
			// 		redirect
			// 	}
			// });
			if (redirect) {
				window.location.assign(`${urls.basePath}${pages['/account/pagejump']}?redirect=${redirect}`);
			} else {
				window.location.assign(urls.basePath + pages['/account/pagejump']);
			}
		} catch (error) {
			ui.Message.error((error as Error).message);
		}
	}
	return <>
		<div className="con">
			<span className="title">请选择登录角色</span>
			<div className="content">
				<div className="bcontent">
					{data.map((row) => {
						return <div key={row.roleid} className="card" onClick={() => {
							void saveCookie(row.roleid, row.rolename);
						}}>
							{row.rolename}
						</div>;
					})}
				</div>
			</div>
		</div>
		<style jsx>{`
.con {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}	

.title {
width: 1250px;
display: flex;
font:normal 400 18px/22.86px normal;
margin:10px 0;
}
.content {
width: 1250px;
height: 640px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #FFF;
}

.bcontent {
width: 720px;
display: flex;
flex-wrap: wrap;
}

.card {
width: 278px;
height: 95px;
display: flex;
justify-content: center;
cursor: pointer;
font:normal 400 20px/25.4px normal;
align-items: center;
margin: 39.5px;
border: 1px solid #E0DCDC;
border-radius: 15px;
background-image: url(${res['/images/sys/rolecard.png']});
}

.card:hover {
background-image: url(${res['/images/sys/rolecard1.png']});
}
		`}</style>
	</>;
}
