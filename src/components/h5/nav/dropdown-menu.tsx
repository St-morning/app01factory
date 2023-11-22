import { DropdownMenu as Base } from '@arco-design/mobile-react';
import { DropdownMenuProps as Props } from '@arco-design/mobile-react/esm/dropdown-menu';
import '@arco-design/mobile-react/esm/dropdown/style/css/index.css';
import '@arco-design/mobile-react/esm/dropdown-menu/style/css/index.css';

/**
 * 下拉选择菜单
 * 下拉选择组件，点击选择器(select)展开下拉框(dropdown)，展示选择项(options)，兼容多个选择器的情况。
 */
export default function DropdownMenu(props: Props) {
	return <Base {...props} />;
}
