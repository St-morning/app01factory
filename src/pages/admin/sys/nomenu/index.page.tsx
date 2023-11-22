import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Ui from '../../../../components/ui';

type IProps = {
};

/**
 * 角色未配置菜单登录后页面
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>空菜单页面</title>
			</Head>
			<Ui.MainContainer
				title=''
			>
				<div className="content">
					<div className='txt'>该角色没有菜单，请联系管理员添加</div>
				</div>

			</Ui.MainContainer>
			<style jsx>{`
.content {
height:auto;
width:100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #FFF;
}

.txt {
font:normal 400 24px/20px normal;
color:#838181;
margin-top: 16px;
}
			`}</style>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
