import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import res from '../../../atoms/res';
import Add from './add';
import Edit from './edit';
import DisableEnable from './disable-enable';
import Resetpassword from './resetpassword';
import SelectSearch from './select-search';
import pagesize from '../../../atoms/pagesize';
import apiAdminUserList, { Message as M1, Result as R1 } from '../../api/admin/user/list';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';

type IProps = {
	initQuery: M1;
};

export default function Body({ initQuery }: IProps) {
	// query 刷新条件, 默认为defaultQuery
	const [query, setquery] = useState(initQuery);
	// data 数据列表
	const [data, setdata] = useState({ data: [], total: 0 } as R1);
	const router = useRouter();
	const [loading, setloading] = useState(true);

	// 根据查询条件query来刷新页面
	useEffect(() => {
		void (async () => {
			try {
				// 调用服务 getUserData
				setloading(true);
				const data = await apiAdminUserList(query);
				setdata(data);
				setloading(false);
				await router.push({ query });
			} catch (error) {
				ui.Message.error((error as Error).message);
			}
		})();
	}, [query]);

	return <>
		<Ui.MainContainer
			icon={res['/images/sys/user.svg']}
			title='用户管理'
			subTitle={<Add onAdded={() => {
				setquery({ ...query, page: '1' });
			}} />}
			searchBarChildren={<Ui.Form>
				<Ui.Form.Row>
					<Ui.Form.Column>
						<SelectSearch onSearch={(value) => {
							setquery({ ...query, state: value, page: '1' });
						}} />
					</Ui.Form.Column>
				</Ui.Form.Row>
			</Ui.Form>}
			search={{
				placeholder: '请输入关键字',
				onSearch(value) {
					setquery({ ...query, keyword: value, page: '1' });
				}
			}}
		>
			<Ui.Table
				keyField='userid'
				data={data.data}
				loading={loading}
				pagination={{
					total: data.total,
					current: parseInt(query.page, 10),
					pageSize: pagesize(),
					onChange(page) {
						setquery({ ...query, page: page.toString() });
					}
				}}
				columns={[{
					title: '用户名',
					dataIndex: 'userid',
					width: '9.6875rem'
				}, {
					title: '姓名',
					dataIndex: 'username',
					width: '156px'
				}, {
					title: '性别',
					dataIndex: 'sex',
					width: '70px',
					render(val, row) {
						if (row.sex === 1) {
							return '男';
						} if (row.sex === 2) {
							return '女';
						}
						return '/';
					}
				}, {
					title: '手机号',
					dataIndex: 'phone',
					width: '156px',
				}, {
					title: '邮箱',
					dataIndex: 'ext.email',
					width: '235px'
				}, {
					title: '身份证号',
					dataIndex: 'ext.idno',
					width: '235px'
				}, {
					title: '操作',
					key: 'op',
					dataIndex: 'op',
					width: '381px',
					render(val, row) {
						console.log('rrrrrr', row);
						return <Ui.Table.ButtonGroup>
							{/* 操作列组件 */}
							{/* 编辑 */}
							<Edit userid={row.userid} onClick={() => {
								setquery({ ...query });
							}} />
							{/* 启用/作废 */}
							<DisableEnable userid={row.userid} status={row.state} onClick={() => {
								setquery({ ...query });
							}} />
							{/* 重置密码 */}
							<Resetpassword userid={row.userid} />
						</Ui.Table.ButtonGroup>;

					}
				},
				]}
			/>
		</Ui.MainContainer>
	</>;
}


