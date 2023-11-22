import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import H5 from '../../../components/h5';
import ctrls from '../../api/ctrls';
import Logininput from './logininput';
import Title from './title';
import Footer from './footer';

type IProps = {
	name: string;
	redirect: string;
};

/**
 * 登录
 */
const Page: NextPage<IProps> = ({ name, redirect }) => {
	const paddingV = '1rem';
	return (
		<>
			<Head>
				<title>登录</title>
			</Head>
			<div className='page'>
				<H5.Layout.Row>
					<H5.Layout.Column>
						<Title name={name} />
						<Logininput redirect={redirect} />
					</H5.Layout.Column>
				</H5.Layout.Row>
				<H5.Layout.Row>
					<Footer />
				</H5.Layout.Row>
			</div>
			<style jsx>{`
.page{
height: calc(100% - 2 * ${paddingV});
padding: ${paddingV} 0.5rem;
display: flex;
flex-direction: column;
justify-content: space-between;
}
`}</style>
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
