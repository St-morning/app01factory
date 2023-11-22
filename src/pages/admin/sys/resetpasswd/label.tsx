import { ReactNode } from 'react';

export default function Label({
	children
}: {
	children: ReactNode;
}
) {
	return <>
		<span className='txt'>{children}</span>
		<style jsx>{`
.txt {
color:#000;
}
`}</style>
	</>;
}
