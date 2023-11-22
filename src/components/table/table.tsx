import { Table as BaseTable, TableProps } from '@arco-design/web-react';
import TableButton from './btn';
import TableButtonGroup from '../btn/group';

/**
 * 表格
 */
export default function Table<T>(props: TableProps<T> & ({
	keyField: keyof T;
	keyFields?: (keyof T)[];
} | {
	keyField?: keyof T;
	keyFields: (keyof T)[];
})) {
	return <>
		<div className='tb'>
			<div className="table">
				<BaseTable
					rowKey={(row) => {
						return (props.keyFields || [props.keyField]).map((keyField) => {
							return row[keyField] as unknown as string;
						}).join('|');
					}}
					border
					borderCell
					stripe
					{...props}
					onChange={(pagination, sorter, filters, extra) => {
						props.onChange && props.onChange(pagination, sorter, filters, extra);
						if (typeof props.pagination === 'object' && props.pagination.onChange) {
							props.pagination.onChange(pagination.current, pagination.pageSize);
						}
					}}
				/>
			</div>
		</div>
		<style jsx>{`
.tb{
display: flex;
width: 100%;
}
.table {
width: 100%;
background-color: #FFF;
padding: 1rem;
overflow: auto;
}
		`}</style>
	</>;
}

/**
 * 表单按钮
 */
Table.Button = TableButton;

/**
 * 按钮组
 */
Table.ButtonGroup = TableButtonGroup;
