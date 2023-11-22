import { Pagination as Base } from '@arco-design/mobile-react';
import { PaginationProps as Props } from '@arco-design/mobile-react/esm/pagination';
import '@arco-design/mobile-react/esm/pagination/style/css/index.css';

/**
 * 分页器
 * 用于数据分页，为完全受控组件
 */
export default function Pagination(props: Props) {
	return <Base {...props} />;
}
