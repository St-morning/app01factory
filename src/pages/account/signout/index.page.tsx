import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { serialize } from 'cookie';
import pages from '../../../atoms/pages';
import redirect from '../../../atoms/redirect';
import ctrls from '../../api/ctrls';
import api from '../../../atoms/api';

type IProps = {
};

/**
 * 退出登录
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>退出登录</title>
			</Head>
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
	ctrls.sysSession.delUser((name) => {
		context.res.setHeader('Set-Cookie', serialize(name, '', {
			sameSite: 'lax',
			httpOnly: true,
			path: api['/'],
			expires: new Date(1)
		}));
	});
	return redirect(pages['/account/signin']);
};
