import Router from 'next/router';
import { useEffect, useState } from 'react';
import Listtable from './listtable';
import res from '../../../atoms/res';
import Add from './add';
import apiAdminRoleList, { Message as M1, Result as R1 } from '../../api/admin/role/list';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';

export default function Body({
	initQuery
}: {
	initQuery: {
		page: string;
		keyword: string;
	}
}) {
	// 加载
	const [loading, setLoading] = useState(false);
	// 查询条件
	const [query, setQuery] = useState(initQuery);
	// 返回数据
	const [data, setData] = useState({
		data: [],
		total: 0
	} as R1);
	// 查询条件改变时执行
	useEffect(() => {
		void (async () => {
			setLoading(true);
			try {
				const data = await apiAdminRoleList(query);
				setData(data);
				void Router.push({ query });
			} catch (error) {
				ui.Message.error((error as Error).message);
			} finally {
				setLoading(false);
			}
		})();
	}, [query]);
	return <>
		{/* 新增 */}
		<Ui.MainContainer
			icon={res['/images/sys/role.svg']}
			title='角色管理'
			subTitle={
				<Add onChange={() => {
					// 刷新列表
					setQuery({ ...query });
				}} />
			}
			search={{
				placeholder: '请输入角色',
				onSearch(value) {
					setQuery({ ...query, keyword: value, page: '1' });
				}
			}
			}
		>
			{/**搜索/列表 */}
			<Listtable
				data={data}
				loading={loading}
				onPage={(page) => {
					setQuery({
						...query,
						page
					});
				}}
				onRefresh={() => {
					setQuery({ ...query }
					);
				}}
				page={query.page}
			/>
		</Ui.MainContainer>
	</>;
}

