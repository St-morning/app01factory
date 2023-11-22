import LayoutColumn from './layout/column';
import LayoutRow from './layout/row';
import LayoutGrid from './layout/grid';
import LayoutCenterPanel from './layout/center-panel';
import LayoutRowGap from './layout/row-gap';
import LayoutSpace from './layout/space';
import LayoutPage from './layout/page';
import LayoutFill from './layout/fill';

/**
 * 页面容器组件
 */
export default {
	/**
	 * 列容器
	 */
	Column: LayoutColumn,
	/**
	 * 行容器
	 */
	Row: LayoutRow,
	/**
	 * 栅格容器
	 */
	Grid: LayoutGrid,
	/**
	 * 栅格容器
	 */
	CenterPanel: LayoutCenterPanel,
	/**
	 * 行间隔
	 */
	RowGap: LayoutRowGap,
	/**
	 * 间距
	 */
	Space: LayoutSpace,
	/**
	 * 全屏的页面容器组件
	 */
	Page: LayoutPage,
	/**
	 * 完全填充组件
	 */
	Fill: LayoutFill,
};
