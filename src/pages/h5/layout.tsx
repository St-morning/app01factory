import Router from 'next/router';
import { ReactElement, ReactNode, useEffect } from 'react';
import h5Init from '../../atoms/h5/init';
import pages from '../../atoms/pages';
import sleep from '../../atoms/sleep';
import Page from '../../components/h5/layout/page';
import TabBar from '../../components/h5/nav/tab-bar';
import icons from '../../components/icons';

type PageConfig = {
	title: ReactNode;
	url: string;
	icon: ({ color }: { color: string; }) => ReactElement;
	color: string;
	activeColor: string;
};

const tabs = [{
	title: '首页',
	color: '#909399',
	activeColor: '#E3A577',
	url: pages['/h5/home'],
	icon: icons.Home
}, {
	title: '示例',
	url: pages['/h5/demos'],
	color: '#909399',
	activeColor: '#E3A577',
	icon: icons.Menu
}, {
	title: '我的',
	color: '#909399',
	activeColor: '#E3A577',
	url: pages['/h5/my'],
	icon: icons.My
}] as PageConfig[];

export default function H5PageLayout({
	children,
	pathname
}: {
	children: ReactNode;
	pathname: string;
}) {
	const activeIndex = getTabPageIndex(pathname, tabs);
	useEffect(() => {
		h5Init();
	}, []);
	useEffect(() => {
		void (async () => {
			if (activeIndex >= 0) {
				// 延迟加载，优先加载当前页面的内容
				await sleep(1500);
				await Promise.all(tabs.map(async (tab, idx) => {
					if (activeIndex !== idx) {
						await Router.prefetch(tab.url);
					}
				}));
			}
		})();
	}, [activeIndex]);
	if (activeIndex < 0) {
		return <Page height={100} padding='0'>{children}</Page>;
	}
	return <>
		<Page height={92}>{children}</Page>
		<TabBar
			activeIndex={activeIndex}
			onChange={async (idx) => {
				await Router.push(tabs[idx].url);
			}}
			dataSource={tabs.map((tab) => {
				return {
					title: tab.title,
					icon(active) {
						// 经常会用两种不同图标展示
						return active ? <tab.icon color={tab.activeColor} /> : <tab.icon color={tab.color} />;
					}
				};
			})}
			fixed={true}
		/>
	</>;
}

function getTabPageIndex(pathname: string, tabs: PageConfig[]) {
	return tabs.findIndex((tab) => {
		return tab.url === pathname;
	});
}
