import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import ctrls from '../../../api/ctrls';
import { SysGroupListgroupusersResult as R3 } from '../../../api/controllers/sys/group';
import pages from '../../../../atoms/pages';
import pagesize from '../../../../atoms/pagesize';
import res from '../../../../atoms/res';
import Ui from '../../../../components/ui';
import apiAdminGroupUnionUserListUser, { Message as M1, Result as R1 } from '../../../api/admin/group/union-user/list-user';
import apiAdminGroupUnionUserSave, { Message as M2, Result as R2 } from '../../../api/admin/group/union-user/save';

type Data = R1['data'][0] & { checked: boolean; };
type SelectedData = Pick<R3[0], 'userid' | 'username'>;

type IProps = {
	groupid: string;
	groupname: string;
	keyword: string;
	page: string;
	users: R3;
};

type Item = { userid: string; };

function arr2map<T extends Item>(arr: T[]) {
	return arr.reduce((pre, cur) => {
		return pre.set(cur.userid, cur);
	}, new Map<string, T>());
}

function map2arr<T extends Item>(map: Map<string, T>) {
	return Array.from(map.values());
}

/**
 * 关联用户
 */
const Page: NextPage<IProps> = ({ groupid, groupname, keyword, page, users }) => {
	const [query, setquery] = useState({
		keyword,
		page
	} as M1);
	const [checkedAll, setcheckedAll] = useState(false);
	const [data, setdata] = useState([] as Data[]);
	const [selected, setselected] = useState(users as SelectedData[]);
	const [total, settotal] = useState(0);
	const [indeterminate, setindeterminate] = useState(false);
	useEffect(() => {
		const mapSelected = arr2map(selected);
		data.forEach((it) => {
			const userid = it.userid;
			if (it.checked) {
				if (mapSelected.has(userid) === false) {
					mapSelected.set(userid, {
						userid,
						username: it.username
					});
				}
			} else if (mapSelected.has(userid) === true) {
				mapSelected.delete(userid);
			}
		});

		setselected(map2arr(mapSelected));
		const selectedSinglePage = data.filter((it) => {
			return it.checked;
		});
		if (data.length === 0) {
			setcheckedAll(false);
			setindeterminate(false);
			return;
		}
		const ac = selectedSinglePage.length === data.length;
		setcheckedAll(selectedSinglePage.length === data.length);
		setindeterminate(selectedSinglePage.length > 0 && !ac);
	}, [data]);
	useEffect(() => {
		void (async () => {
			const data = await apiAdminGroupUnionUserListUser(query);
			const m = arr2map(selected);
			setdata(data.data.map((it) => {
				const r = m.has(it.userid);
				return {
					...it,
					checked: r || it.groups.findIndex((group) => {
						return group.groupid === groupid;
					}) >= 0
				};
			}));
			settotal(data.total);
		})();
	}, [query]);
	return (
		<>
			<Head>
				<title>关联用户</title>
			</Head>
			<Ui.MainContainer
				title='关联用户'
				parents={[{
					name: '组别管理',
					url: pages['/admin/group']
				}]}
				icon={res['/images/sys/group.svg']}
			>
				<div className='container'>
					<Ui.Form>
						<Ui.Form.Row>
							<Ui.Form.Column span={8}>
								<Ui.Form.Item.Input
									label={'组别名称'}
									value={groupname}
									disabled
								/>
							</Ui.Form.Column>
							<Ui.Form.Column offset={14} span={2}>
								<Ui.Button.Save
									onClick={async () => {
										await apiAdminGroupUnionUserSave({
											groupid,
											users: selected.map((user) => {
												return user.userid;
											})
										});
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column span={12}>
								<Ui.Form.Row>
									<Ui.Form.Column offset={1} span={20}>
										<div className='title'>
											搜索范围
										</div>
									</Ui.Form.Column>
								</Ui.Form.Row>
								<Ui.Form.Row>
									<Ui.Form.Column offset={1} span={20}>
										<Ui.Form.Item.Search
											searchButton='搜索'
										/>
									</Ui.Form.Column>
								</Ui.Form.Row>
								<Ui.Form.Row>
									<Ui.Form.Column>
										<Ui.Table
											data={data}
											keyField={'userid'}
											columns={[{
												dataIndex: 'userid',
												title: <Ui.Form.Item.Checkbox checked={checkedAll} indeterminate={indeterminate} onChange={(v) => {
													setdata(data.map(({ checked, ...rest }) => {
														return {
															...rest,
															checked: v
														};
													}));
												}} >用户名</Ui.Form.Item.Checkbox>,
												render(_val, row) {
													return <Ui.Form.Item.Checkbox
														checked={row.checked}
														onChange={(v) => {
															setdata(data.map((it) => {
																if (it.userid === row.userid) {
																	return {
																		...it,
																		checked: v
																	};
																}
																return it;
															}));
														}}
													>{row.userid}</Ui.Form.Item.Checkbox>;
												}
											}, {
												dataIndex: 'username',
												title: '用户姓名'
											}]}
											pagination={{
												current: parseInt(query.page || '1', 10),
												total,
												pageSize: pagesize(),
												onChange(pageNumber) {
													setquery({
														...query,
														page: pageNumber.toString()
													});
												},
											}}
										/>
									</Ui.Form.Column>
								</Ui.Form.Row>
							</Ui.Form.Column>
							<Ui.Form.Column span={12}>
								<Ui.Form.Row>
									<Ui.Form.Column span={12}>已选择:({selected.length}个)</Ui.Form.Column>
									<Ui.Form.Column offset={8} span={4}>
										<Ui.Button.Icon
											title='清空'
											icon={res['/images/sys/del.png']}
											onClick={() => {
												setdata(data.map((it) => {
													return {
														...it,
														checked: false
													};
												}));
												setselected([]);
											}}
										/>
									</Ui.Form.Column>
								</Ui.Form.Row>
								<Ui.Form.Row>
									<Ui.Form.Column>
										<Ui.Table
											data={selected}
											keyField={'userid'}
											showHeader={false}
											border={false}
											borderCell={false}
											stripe={false}
											columns={[{
												dataIndex: 'username',
												title: '用户姓名',
												render(v, row) {
													return `${v}(${row.userid})`;
												}
											}, {
												dataIndex: 'userid',
												title: '操作',
												render(val, row) {
													return <Ui.Table.ButtonGroup>
														<Ui.Button.Icon
															title='删除'
															icon={res['/images/sys/del2.png']}
															onClick={() => {
																const m = arr2map(selected);
																const r = m.has(val);
																if (r) {
																	m.delete(val);
																	setselected(map2arr(m));
																}
																setdata(data.map((it) => {
																	if (it.userid === val) {
																		return {
																			...it,
																			checked: false
																		};
																	}
																	return it;
																}));
															}}
														/>
													</Ui.Table.ButtonGroup>;
												}
											}]}
											pagination={false}
										/>
									</Ui.Form.Column>
								</Ui.Form.Row>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form>
				</div>
			</Ui.MainContainer>
			<style jsx>{`
.container{
width: 100%;
background-color: #fff;
padding: 2rem;
}
.title{
padding: 1rem;
}
`}</style>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	const groupid = query.groupid as string;
	const group = await ctrls.sysGroup.getByID({ groupid });
	const groupname = group?.groupname;
	const users = await ctrls.sysGroup.listGroupUsers({ groupid });

	return {
		props: {
			groupid: '',
			keyword: '',
			page: '1',
			...query,
			groupname,
			users,
		},
	};
};
