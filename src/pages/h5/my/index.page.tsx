import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';

type IProps = {
};

/**
 * 我的
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>我的</title>
			</Head>
			<span>我的</span>
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
	return {
		props: {}
	};
};
