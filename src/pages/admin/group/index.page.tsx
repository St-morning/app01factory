import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';
import { Message as M1 } from '../../api/admin/group/list';

type IProps = {
	init: M1;
};

/**
 * 组别管理
 */
const Page: NextPage<IProps> = ({ init }: IProps) => {
	return (
		<>
			<Head>
				<title>组别管理</title>
			</Head>
			<Body
				initQuery={init}
			/>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	const data = await Promise.resolve({
		props: {
			init: {
				page: query.page || '1',
				keyword: query.keyword || ''
			}
		}
	});
	return data;
};

export default Page;
