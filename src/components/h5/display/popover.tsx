import { Popover as Base } from '@arco-design/mobile-react';
import { PopoverProps as Props } from '@arco-design/mobile-react/esm/popover';
import '@arco-design/mobile-react/esm/popover/style/css/index.css';

/**
 * 气泡卡片
 * 支持六个方向，小箭头在各个方向均基于挂载的子元素居中放置，支持受控和非受控模式。
 */
export default function Popover(props: Props) {
	return <Base {...props} />;
}

Popover.Menu = Base.Menu;
