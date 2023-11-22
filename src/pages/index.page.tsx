import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import pages from '../atoms/pages';
import Ui from '../components/ui';

type IProps = {
	pages: string[];
};

/**
 * 01微工厂
 */
const Page: NextPage<IProps> = ({ pages }) => {
	return (
		<>
			<Head>
				<title>01微工厂</title>
			</Head>
			<Pages pages={pages} />
		</>
	);
};

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const all = (() => {
		if (process.env.NODE_ENV === 'development') {
			return Object.keys(pages);
		}
		return [];
	})();
	const props = await Promise.resolve({
		props: {
			pages: all
		}
	});
	return props;
};


export const config: PageConfig = {
	amp: false
};

export default Page;

function Pages({
	pages
}: {
	pages: string[];
}) {
	return <div className='pages'>{pages.map((page) => {
		return <Ui.Link key={page} style={{ width: '100%' }} href={page}><span className='page'>{page}</span></Ui.Link>;
	})}
		<style jsx>{`
.page:hover{
background-color: #faebd7;
}
.pages{
display: flex;
flex-direction: column;
padding: 2rem;
}
`}</style>
	</div>;
}
