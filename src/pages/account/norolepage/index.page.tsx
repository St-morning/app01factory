import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';

type IProps = {
};

/**
 * 无用户角色页面
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>无用户角色</title>
			</Head>
			<Body />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
