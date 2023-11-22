import Edit from './edit';
import Delete from './delete';
import UnionUser from './union-user';
import UnionMenu from './union-menu';
import pagesize from '../../../atoms/pagesize';
import { Result as R1 } from '../../api/admin/role/list';
import Ui from '../../../components/ui';

export default function Listtable({
	loading,
	data,
	page,
	onPage,
	onRefresh,
}: {
	loading: boolean;
	data: R1;
	page: string;
	onPage(page: string): void;
	onRefresh(): void;
}) {
	return <>
		<Ui.Table
			// 数据
			data={data.data}
			keyField='roleid'
			loading={loading}
			// 分页器
			pagination={{
				current: parseInt(page || '1', 10),
				pageSize: pagesize(),
				total: data.total,
				onChange: (p) => {
					onPage(p.toString());
				}
			}}
			// 表头
			// 查看列
			columns={[
				{
					title: '角色名称',
					dataIndex: 'rolename',
					width: '12rem'
				}, {
					title: '角色描述',
					dataIndex: 'description',
					ellipsis: true
				}, {
					// 操作列
					key: 'op',
					title: '操作',
					dataIndex: 'op',
					width: '25rem',
					render: (val, row) => {
						return <>
							<Ui.Table.ButtonGroup>
								{ /**编辑操作 */}
								<Edit data={row} onEdit={() => {
									onRefresh();
								}} />
								{ /**删除操作 */}
								<Delete roleid={row.roleid} onChange={() => {
									onRefresh();
								}} />
								{ /**关联用户操作 */}
								<UnionUser roleid={row.roleid} />
								{/**关联菜单操作 */}
								<UnionMenu roleid={row.roleid} />
							</Ui.Table.ButtonGroup>
						</>;
					}
				}
			]}
		/>
	</>;
}
