import { useEffect, useState } from 'react';
import res from '../../../../atoms/res';
import apiAdminRoleUnionUserListGroup, { Message as M1, Result as R1 } from '../../../api/admin/role/union-user/list-group';
import pages from '../../../../atoms/pages';
import { TreeData } from '../../../../components/tree';
import apiAdminRoleUnionUserListGroupUsers, { Message as M2, Result as R2 } from '../../../api/admin/role/union-user/list-group-users';
import apiAdminRoleUnionUserSave, { Data as D3, Message as M3, Result as R3 } from '../../../api/admin/role/union-user/save';
import Ui from '../../../../components/ui';
import ui from '../../../../atoms/ui';

type Data = R2[0] & { checked: boolean; };

export default function Body({
	roleid,
	rolename
}: {
	roleid: string;
	rolename: string;
}) {
	const [groups, setgroups] = useState([] as R1);
	const [users, setusers] = useState([] as Data[]);
	const [keyword, setkeyword] = useState('');
	const { data: selected, checkedKeys } = users.reduce((s, user) => {
		if (user.checked) {
			s.checkedKeys.push(getKey(user));
			if (!s.keys.has(user.userid)) {
				s.keys.add(user.userid);
				s.data.push(user);
			}
		}
		return s;
	}, {
		data: [] as Data[],
		checkedKeys: [] as string[],
		keys: new Set<string>()
	});
	useEffect(() => {
		void (async () => {
			const data = await apiAdminRoleUnionUserListGroup({});
			setgroups(data);
		})();
	}, []);

	function getKey(user: R2[0]) {
		return `${user.userid}|${user.groupid}`;
	}

	function match(val: string) {
		if (!keyword) {
			return true;
		}
		return val.indexOf(keyword) > -1;
	}

	const treeData = groups.map((group) => {
		const children = users.filter((user) => {
			return user.groupid === group.groupid && (match(user.userid) || match(user.username));
		}).map((user) => {
			return {
				userid: user.userid,
				key: getKey(user),
				title: `${user.username}(${user.userid})`,
				isLeaf: true,
				checked: user.checked
			} as TreeData;
		});
		const visible = match(group.groupid) || match(group.groupname) || children.length > 0;
		return {
			visible,
			key: group.groupid,
			title: group.groupname,
			children,
			isLeaf: false
		} as TreeData;
	}).filter((td) => {
		return td.visible;
	});
	return <Ui.MainContainer
		title='关联用户'
		parents={[{
			name: '角色管理',
			url: pages['/admin/role']
		}]}
		icon={res['/images/sys/role.svg']}
	>
		<div className='container'>
			<Ui.Form>
				<Ui.Form.Row>
					<Ui.Form.Column span={8}>
						<Ui.Form.Item.Input
							label={'角色名称'}
							value={rolename}
							disabled
						/>
					</Ui.Form.Column>
					<Ui.Form.Column offset={14} span={2}>
						<Ui.Button.Save
							onClick={async () => {
								await apiAdminRoleUnionUserSave({
									roleid,
									userids: selected.map((u) => {
										return u.userid;
									})
								});
								ui.Message.success('保存成功');
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
									onSearch={(v) => {
										setkeyword(v);
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<Ui.Tree
									checkable
									actionOnClick={['expand', 'check']}
									checkedKeys={checkedKeys}
									treeData={treeData}
									loadMore={async (node) => {
										const dr = node.props.dataRef;
										console.log('aaaaaaaa', dr);
										const groupid = dr.key;
										if (users.some((user) => {
											return user.groupid === groupid;
										})) {
											return;
										}
										const data = await apiAdminRoleUnionUserListGroupUsers({
											groupid
										});
										setusers(users.concat(data.map((user) => {
											return {
												...user,
												checked: user.roles.findIndex((role) => {
													return role.roleid === roleid;
												}) >= 0
											};
										})));
									}}
									onCheck={(keys, { checkedNodes }) => {
										const checkedKeys = new Set(checkedNodes.map((node) => {
											return node.props.dataRef.userid as string;
										}));
										setusers(users.map((user) => {
											return {
												...user,
												checked: checkedKeys.has(user.userid)
											};
										}));
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
										setusers(users.map((user) => {
											return {
												...user,
												checked: false
											};
										}));
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
										title: '用户id',
										render(val) {
											return <Ui.Table.ButtonGroup>
												<Ui.Button.Icon
													title='删除'
													icon={res['/images/sys/del2.png']}
													onClick={() => {
														setusers(users.map((it) => {
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
	</Ui.MainContainer>;
}
