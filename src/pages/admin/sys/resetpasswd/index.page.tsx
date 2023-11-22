import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';

type IProps = {
};

/**
 * 重置密码
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>重置密码</title>
			</Head>
			<Body />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
