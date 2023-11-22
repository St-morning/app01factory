import { useEffect, useState } from 'react';
import router from 'next/router';
import Listtable from './listtable';
import res from '../../../atoms/res';
import Add from './add';
import apiAdminGroupList, { Message as M1, Result as R1 } from '../../api/admin/group/list';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';

export default function Body({
	initQuery,
}: {
	initQuery: M1;
}) {
	// 路由
	// 服务返回的数组进行保存, 作为渲染列表的数据源
	// 当setquery进行保存时, query值作为useffect的第二个参数, query值改变, 将调用页面初始化服务进行页面刷新
	// 总行数
	// 加载
	const [data, setdata] = useState({} as R1);
	const [query, setquery] = useState(initQuery);
	const [loading, setloading] = useState(false);
	// 初始化查询服务
	useEffect(() => {
		// 异步函数
		void (async () => {
			// 查询服务
			try {
				setloading(true);
				const data = await apiAdminGroupList(query);
				setdata(data);
				await router.push({ query });
			} catch (error) {
				ui.Message.error((error as Error).message);
			} finally {
				setloading(false);
			}
		})();
	}, [query]);
	return <>
		{/* 新增 */}
		<Ui.MainContainer
			icon={res['/images/sys/group.svg']}
			title='组别列表'
			subTitle={<Add
				onChange={() => {
					setquery({
						...query,
						page: '1'
					});
				}}
			/>}
			search={{
				placeholder: '请输入关键字',
				onSearch(value) {
					setquery({ ...query, keyword: value, page: '1' });
				}
			}}
		>
			<Listtable
				loading={loading}
				data={data.data}
				count={data.total}
				page={query.page}
				onPage={(p) => {
					// console.log('11111111', p);
					setquery({ ...query, page: p });
				}}
				onRefresh={() => {
					setquery({ ...query });
				}} />
		</Ui.MainContainer>
	</>;
}
