import { ReactNode } from 'react';

/**
 * 页面总局组件
 */
export default function Page({
	children,
	height = 90,
	padding = '0.2rem'
}: {
	height?: string | number;
	children: ReactNode;
	padding?: string;
}) {
	const ht = typeof height === 'number' ? `${height}vh` : height;
	return <div className='page'>
		{children}
		<style jsx>{`
.page{
height: ${ht};
overflow-y: scroll;
padding: ${padding}
}
`}</style>
	</div>;
}
