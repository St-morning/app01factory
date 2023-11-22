import { Cell as Base } from '@arco-design/mobile-react';
import { CellProps as Props } from '@arco-design/mobile-react/esm/cell';
// import '@arco-design/mobile-react/style/css/public.css';
import '@arco-design/mobile-react/esm/cell/style/css/index.css';

/**
 * 单元格
 * 单元格组件，含单元格及单元格组合，常用于设置项、表单等。
 */
export default function Cell(props: Props) {
	return <Base {...props} />;
}
