import { Tree as ArcoTree, TreeProps } from '@arco-design/web-react';

export { type TreeDataType as TreeData } from '@arco-design/web-react/es/Tree/interface';

export default function Tree(props: TreeProps) {
	return <ArcoTree
		{...props}
	/>;
}
