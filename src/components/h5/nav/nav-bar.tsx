import { NavBar as Base } from '@arco-design/mobile-react';
import { NavBarProps as Props } from '@arco-design/mobile-react/esm/nav-bar';
import '@arco-design/mobile-react/esm/nav-bar/style/css/index.css';

/**
 * 导航栏
 * 支持吸顶和沉浸式，支持在指定滚动位置展示，支持根据滚动位置实时更新style。
 */
export default function NavBar(props: Props) {
	return <Base
		{...props}
	/>;
}
