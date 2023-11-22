import { ReactNode } from 'react';
import LayoutBase from '../layout/layout';

/**
 * 按钮组
 */
export default function ButtonGroup({
	children
}: {
	children: ReactNode;
}) {
	return <LayoutBase
		direction='row'
		justifyContent='start'
		alignItems='center'
	>{children}</LayoutBase>;
}
