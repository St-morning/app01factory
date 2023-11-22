import { ReactNode } from 'react';

/**
 * 完全填充组件
 */
export default function LayoutFill({
	children
}: {
	children: ReactNode;
}) {
	return <>
		<div className={'fill'}>
			{children}
		</div>
		<style jsx>{`
.fill{
display: flex;
flex-grow: 1;
overflow-x: hidden;
overflow-y: auto;
width: 100%;
height: 100%;
}
`}</style>
	</>;
}
