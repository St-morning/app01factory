import { NextPage, PageConfig } from 'next';
import Head from 'next/head';

type IProps = {
};

/**
 * 01factory
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>01factory</title>
			</Head>
			<span>Home</span>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
