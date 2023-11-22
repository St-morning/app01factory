import { Input } from '@arco-design/web-react';
import { InputSearchProps } from '@arco-design/web-react/es/Input';

/**
 * 搜索框
 */
export default function FormItemSearch(props: InputSearchProps) {
	return <Input.Search
		allowClear
		{...props}
	/>;
}
