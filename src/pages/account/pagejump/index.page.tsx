import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { serialize } from 'cookie';
import ctrls from '../../api/ctrls';
import redirect from '../../../atoms/redirect';
import api from '../../../atoms/api';

type IProps = {
};

/**
 * 页面跳转页面
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>页面跳转...</title>
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// 页面跳转页面初始化
// eslint-disable-next-line require-await
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	// 从Cookie中取到数据
	let res = {
		props: {}
	};
	function rdrct(url: string) {
		res = redirect(url);
	}
	await ctrls.sysUser.redirectAfterLogin({
		redirect: rdrct,
		redirectUrl: context.query.redirect as string,
		getCookie(name) {
			return context.req.cookies[name];
		},
		setCookie(name, val) {
			return context.res.setHeader('Set-Cookie', serialize(name, val, {
				sameSite: 'lax',
				httpOnly: true,
				path: api['/']
			}));
		}
	});
	// await ctrls.sysUser.redirectAfterLogin(context.req as SysUserParam3, context.res as SysUserParam2, context.query as SysUserParam10);
	return res;
};
