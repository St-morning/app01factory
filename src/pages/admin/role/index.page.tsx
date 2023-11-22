import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';

type IProps = {
	query: {
		page: string;
		keyword: string;
	}
};

/**
 * 角色管理
 */
const Page: NextPage<IProps> = ({ query }) => {
	return (
		<>
			<Head>
				<title>角色管理</title>
			</Head>
			<Body initQuery={query} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = await Promise.resolve(context.query);
	const page = (query.page as string) || '1';
	const keyword = (query.keyword as string) || '';
	return {
		props: {
			query: {
				page,
				keyword,
			}
		}
	};
};
