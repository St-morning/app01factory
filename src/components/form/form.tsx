import { ReactNode } from 'react';
import FormColumn from './column';
import FormRow from './row';
import FormCenterPanel from './center-panel';
import FormRowGap from './row-gap';
import FormGroup from './group';
import FormItem from './item';
import Layout from '../layout/layout';
import LayoutCol from '../layout/column';
import Uploader from '../file/uploader';
import FileList from '../file/file-list';

/**
 * 表单
 */
export default function Form({
	children
}: {
	children?: ReactNode;
}) {
	return <Layout
		direction='column'
		justifyContent='start'
		alignItems='start'
	>
		<LayoutCol>
			{children}
		</LayoutCol>
	</Layout>;
}

/**
 * 表单的列
 */
Form.Column = FormColumn;
/**
 * 表单的行
 */
Form.Row = FormRow;
/**
 * 上下左右居中面板
 */
Form.CenterPanel = FormCenterPanel;
/**
 * 行间隔
 */
Form.RowGap = FormRowGap;
/**
 * 表单分组
 */
Form.Group = FormGroup;
/**
 * 表单项
 */
Form.Item = FormItem;
/**
 * 文件上传
 */
Form.Uploader = Uploader;
/**
 * 文件列表
 */
Form.FileList = FileList;
