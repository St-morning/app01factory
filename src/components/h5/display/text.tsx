import { ReactNode } from 'react';
import { BadgeProps as Props } from '@arco-design/mobile-react/esm/badge';
import Badge from './badge';

/**
 * 带角标的文本
 */
export default function Text({
	children,
	badge
}: {
	children: ReactNode;
	badge?: Props;
}) {
	return <span style={{ position: 'relative' }}>
		{children}
		{badge && <Badge {...badge} />}
	</span>;
}
