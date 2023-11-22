import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import ctrls from '../../api/ctrls';
import Body from './body';

type IProps = {
	name: string;
	redirect: string;
};

/**
 * 用户登录
 */
const Page: NextPage<IProps> = ({ name, redirect }) => {
	return (
		<>
			<Head>
				<title>用户登录</title>
			</Head>
			<Body name={name} redirect={redirect} />
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
	const query = context.query as Record<string, string>;
	const { redirect = '' } = query;
	const name = await ctrls.sysConfig.getSysName();
	return {
		props: {
			name,
			redirect
		}
	};
};

