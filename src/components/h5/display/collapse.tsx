import { Collapse as Base } from '@arco-design/mobile-react';
import { CollapseProps as Props } from '@arco-design/mobile-react/esm/collapse';
import '@arco-design/mobile-react/esm/collapse/style/css/index.css';

/**
 * 折叠面板
 * 折叠面板组件，支持手风琴模式。
 */
export default function Collapse(props: Props) {
	return <Base {...props} />;
}

Collapse.Group = Base.Group;
