import { Grid as Base } from '@arco-design/mobile-react';
import { GridProps as Props } from '@arco-design/mobile-react/esm/grid';
import '@arco-design/mobile-react/esm/grid/style/css/index.css';

/**
 * 宫格
 * 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。
 */
export default function Grid(props: Props) {
	return <Base {...props} />;
}
