import { Badge as Base } from '@arco-design/mobile-react';
import { BadgeProps as Props } from '@arco-design/mobile-react/esm/badge';
import '@arco-design/mobile-react/esm/badge/style/css/index.css';

/**
 * 徽标
 * 在右上角展示徽标数字或小红点
 */
export default function Badge(props: Props) {
	return <Base {...props} />;
}
