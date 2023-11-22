import { NoticeBar as Base } from '@arco-design/mobile-react';
import { NoticeBarProps as Props } from '@arco-design/mobile-react/esm/notice-bar';
import '@arco-design/mobile-react/esm/notice-bar/style/css/index.css';

/**
 * 信息展示
 * 可自定义换行或滚动效果，支持循环滚动。
 */
export default function NoticeBar({ marquee = 'always', ...props }: Props) {
	return <Base {...props} marquee={marquee} />;
}
