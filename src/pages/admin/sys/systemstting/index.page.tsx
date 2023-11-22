import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Ui from '../../../../components/ui';
import Body from './body';
import SysKeyType from '../../../../db/01factory/type/sys-key';
import ctrls from '../../../api/ctrls';

export type Data = Record<SysKeyType, string>;

type IProps = {
	data: Data;
};

/**
 * 系统信息
 */
const Page: NextPage<IProps> = ({ data }) => {
	return (
		<>
			<Head>
				<title>系统信息</title>
			</Head>
			<Ui.MainContainer title='系统设置'
			>
				<div className="content">
					<Body init={data} />
				</div>
			</Ui.MainContainer>
			<style jsx>{`
.content {
width: 100%;
background-color: #FFF;
padding-bottom: 20px;
}
			`}</style>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

// 页面打包初始化
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const data = await ctrls.sysConfig.list();
	return {
		props: {
			data
		}
		// {
		// init: {
		// 	// 系统名称
		// 	name: getItem(sysdata, 'name') || '摩尔斯通电子阅卷系统',
		// 	// 系统登录logou
		// 	loginlogo: getImg('loginlogo', sysdata) || '/score/admin/hanglog.png',
		// 	// 底部背景图片
		// 	bottomimg: getImg('bottomimg', sysdata) || '/score/admin/bgimg.png',
		// 	// 系统门户Logo
		// 	homelogo: getImg('homelogo', sysdata) || '/score/admin/homelogo.png'

		// }
		// }
	};
};

export default Page;
