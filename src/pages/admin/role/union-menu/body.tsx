import { useEffect, useState } from 'react';
import res from '../../../../atoms/res';
import pages from '../../../../atoms/pages';
import apiAdminRoleUnionMenuListMenus, { Data as D1, Message as M1, Result as R1 } from '../../../api/admin/role/union-menu/list-menus';
import apiAdminRoleUnionMenuSave, { Data as D4, Message as M4, Result as R4 } from '../../../api/admin/role/union-menu/save';
import Ui from '../../../../components/ui';
import { TreeData } from '../../../../components/tree';
import ui from '../../../../atoms/ui';

type Data = D1 & {
	checked: boolean;
};
type Data2 = Data & {
	children: Data2[];
};

export default function Body({
	roleid,
	rolename
}: {
	roleid: string;
	rolename: string;
}) {
	const [menus, setmenus] = useState([] as Data[]);
	const [keyword, setkeyword] = useState('');
	const { data: selected, checkedKeys } = menus.reduce((s, menu) => {
		if (menu.checked) {
			s.checkedKeys.push(menu.menuid);
			s.data.push(menu);
		}
		return s;
	}, {
		data: [] as Data[],
		checkedKeys: [] as string[],
	});
	useEffect(() => {
		void (async () => {
			const data = await apiAdminRoleUnionMenuListMenus({});
			// setmenus(menus2tree(data, roleid));
			setmenus(data.map((d) => {
				return {
					...d,
					checked: d.roles.findIndex((role) => {
						return role.roleid === roleid;
					}) >= 0
				};
			}));
		})();
	}, []);
	console.log('aaaaaaaa', checkedKeys);

	const treeDataLeft = menu2tree(menus, keyword)
		.filter((td) => {
			return td.visible;
		});
	return <Ui.MainContainer
		title='关联菜单'
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
								await apiAdminRoleUnionMenuSave({
									roleid,
									menuids: selected.map((menu) => {
										return menu.menuid;
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
									treeData={treeDataLeft}
									onCheck={(keys) => {
										console.log('ccccccccccccccccc', keys);
										const checkedKeys = new Set(keys);
										setmenus(menus.map((menu) => {
											return {
												...menu,
												checked: checkedKeys.has(menu.menuid)
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
										setmenus(menus.map((menu) => {
											return {
												...menu,
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
									keyField={'menuid'}
									showHeader={false}
									border={false}
									borderCell={false}
									stripe={false}
									columns={[{
										dataIndex: 'menuname',
										title: '菜单名称',
									}, {
										dataIndex: 'menuid',
										title: '菜单id',
										render(val) {
											return <Ui.Table.ButtonGroup>
												<Ui.Button.Icon
													title='删除'
													icon={res['/images/sys/del2.png']}
													onClick={() => {
														setmenus(menus.map((menu) => {
															if (menu.menuid === val) {
																return {
																	...menu,
																	checked: false
																};
															}
															return menu;
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

function unCheckAll(menus: Data[]) {
}

function transAll<T extends { children?: T[]; }, M extends { children: M[]; }>(data: T[], callback: (row: T, children: M[]) => M): M[] {
	return (data || []).map((menu) => {
		const children = transAll(menu.children, callback);
		return {
			...callback(menu, children),
			children
		};
	});
}

function menu2tree(menus: Data[], keyword: string): TreeData[] {
	function match(val: string) {
		if (!keyword) {
			return true;
		}
		return val.indexOf(keyword) > -1;
	}
	return transAll(makeMenus(menus), (menu, children) => {
		const visible = match(menu.menuname) || children.length > 0;
		return {
			visible,
			key: menu.menuid,
			title: menu.menuname,
			children,
			isLeaf: children.length === 0,
			checked: menu.checked
		} as TreeData & { children: TreeData[]; };
	});
}

function makeMenus(menus: Data[]) {
	return menus.filter((menu) => {
		return !menu.pid;
	}).map((menu) => {
		return makeSubMenu(menu, menus);
	});
}

function makeSubMenu(menu: Data, menus: Data[]): Data2 {
	const children = menus.filter((m) => {
		return m.pid === menu.menuid;
	}).map((m) => {
		return makeSubMenu(m, menus);
	});
	return {
		...menu,
		children
	} as Data2;
}
