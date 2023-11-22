import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import parser from '@apidevtools/json-schema-ref-parser';
import Api from './api';

type IProps = {
	doc: any;
};

/**
 * API
 */
const Page: NextPage<IProps> = ({ doc }) => {
	return (
		<>
			<Head>
				<title>API</title>
			</Head>
			<Api doc={doc} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async () => {
	const doc11 = await parser.bundle('docs/api.yaml');
	return {
		props: {
			doc: doc11
		}
	};
};

