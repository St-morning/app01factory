import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';
import { Message as M1, Result as R1 } from '../../api/admin/user/list';

type IProps = {
	init: M1;
};

const Page: NextPage<IProps> = ({ init }: IProps) => {
	return (
		<>
			<Head>
				<title>用户管理页面</title>
			</Head>
			<Body initQuery={init} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = await Promise.resolve(context.query) as Record<string, string>;
	return {
		props: {
			init: {
				page: query.page || '1',
				state: query.status || '',
				keyword: query.value || ''
			}
		}
	};
};


export default Page;
