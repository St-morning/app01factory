import { SearchBar as Base } from '@arco-design/mobile-react';
import { SearchBarProps as Props } from '@arco-design/mobile-react/esm/search-bar';
import '@arco-design/mobile-react/style/css/public.css';
import '@arco-design/mobile-react/esm/search-bar/style/css/index.css';

/**
 * 搜索栏组件
 */
export default function SearchBar(props: Props) {
	return <Base {...props} />;
}
