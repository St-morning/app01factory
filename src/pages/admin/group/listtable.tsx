import Edit from './edit';
import Delete from './delete';
import UnionUser from './union-user';
import pagesize from '../../../atoms/pagesize';
import { Result as R1 } from '../../api/admin/group/list';
import Ui from '../../../components/ui';

export default function Listtable({
	loading,
	data,
	count,
	page,
	onPage,
	onRefresh
}: {
	loading: boolean;
	data: R1['data'];
	count: number;
	page: string;
	onPage(page: string): void;
	onRefresh(): void;
}) {
	// 渲染列表数据，定义一个函数数组，传递值，限制参数类型
	return <>
		{/* 表格组件 */}
		<Ui.Table
			data={data}
			keyField='groupid'
			loading={loading}
			// 分页器设置
			// 当前页面；页面数据十条；onchange事件(输入什么，显示什么)
			pagination={{
				current: parseInt(page || '1', 10),
				pageSize: pagesize(),
				total: count,
				onChange: (p) => {
					onPage(p.toString());
				}
			}}
			// 表格列属性，表格组件中的参数命名 组别名称：group_name,账号：userid,操作：op
			columns={[{
				title: '组别名称',
				dataIndex: 'groupname',
			}, {
				title: '操作',
				dataIndex: 'groupid',
				width: '23.75rem',
				render: (val, row, index) => {
					/**
					 * 操作列显示内容,编辑, 删除 关联用户
					 * 数据源:row,其实就是初始化服务的返回值data数组
					 */
					return <>
						<Ui.Table.ButtonGroup>
							<Edit
								data={row}
								onChange={() => {
									onRefresh();
								}}
							/>
							<Delete
								groupid={val}
								onChange={() => {
									onRefresh();
								}}
							/>
							{/* 关联用户 */}
							< UnionUser groupid={val} />
						</Ui.Table.ButtonGroup>
					</>;
				}
			}
			]}
		/>
	</>;
}
