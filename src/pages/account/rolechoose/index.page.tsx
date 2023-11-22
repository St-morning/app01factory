import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { SysUserGetRolesResult } from '../../api/controllers/sys/user';
import ctrls from '../../api/ctrls';
import Body from './body';

type IProps = {
	// 用户角色列表数据
	data: SysUserGetRolesResult;
	redirect: string;
};

/**
 * 多用户角色选择页面
 */
const Page: NextPage<IProps> = ({ data, redirect }) => {
	return (
		<>
			<Head>
				<title>多用户角色选择页面</title>
			</Head>
			<Body data={data} redirect={redirect} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
// eslint-disable-next-line require-await, @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	// 获取所有用户的角色
	const { redirect = '' } = context.query as Record<string, string>;
	const data = await ctrls.sysUser.getRoles({
		getCookie(name) {
			return context.req.cookies[name] as string;
		}
	});
	return {
		props: {
			data,
			redirect
		}
	};
};
