import { AppContext, AppInitialProps } from 'next/app';
import '@arco-design/web-react/dist/css/arco.css';
import '../../styles/globals.css';
import PageLayout from './layout';
import H5PageLayout from './h5/layout';

function App({ Component, pageProps, router }: AppInitialProps & AppContext) {
	const pathname = router.pathname;
	if (/^\/public/.test(pathname)) {
		return <Component {...pageProps} />;
	}
	if (/sign(in|up)/.test(pathname)) {
		return <Component {...pageProps} />;
	}
	if (/^\/h5/.test(pathname)) {
		return <H5PageLayout pathname={pathname}>
			<Component {...pageProps} />
		</H5PageLayout>;
	}
	return <>
		<PageLayout pathname={pathname}>
			<Component {...pageProps} />
		</PageLayout>
	</>;
}

export default App;
