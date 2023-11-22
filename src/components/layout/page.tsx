import { ReactNode } from 'react';
import LayoutBase from './layout';

/**
 * 全屏的页面容器组件
 */
export default function LayoutPage({
	children
}: {
	children: ReactNode;
}) {
	return <>
		<div className={'page'}>
			<LayoutBase
				direction='column'
				justifyContent='space-between'
				alignItems='start'
			>
				{children}
			</LayoutBase>
		</div>
		<style jsx>{`
.page{
width: 100vw;
height: 100vh;
}
`}</style>
	</>;
}
