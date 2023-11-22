import mmLogger from '../../../../atoms/server/logger';
import tbTb01menu, { ITb01menu } from '../../../../db/01factory/table/tb01menu';
import tb01rolemenu from '../../../../db/01factory/table/tb01rolemenu';
import RoleType from '../../../../db/01factory/type/role';
import viewRoleMenu, { IVRoleMenu } from '../../../../db/01factory/view/rolemenu';

const logger = mmLogger('pages/api/controllers/sys/menu');

export type SysMenuParam1 = ITb01menu;
export type SysMenuParam2 = IVRoleMenu;
export type SysMenuGetByRoleIDParam = RoleType;
export type SysMenuGetByRoleIDResult = ITb01menu[];

const sysMenu = {
	async getByRoleID(roleid: SysMenuGetByRoleIDParam) {
		logger.debug('get menu by roleid:', roleid);
		if (!roleid) {
			return [];
		}
		// 获取菜单
		const menus = await this.list();
		// 先查找全部已配置菜单
		const m1 = await viewRoleMenu()
			.query({
				roleid
			})
			.orderBy('weight', 'desc');
		// 再根据已配置菜单查找上级菜单中未配置的菜单，对于未配置的菜单，亦认为是可见的
		function getParent(menu: SysMenuParam1): SysMenuParam1[] {
			if (!menu.pid) {
				return [menu];
			}
			return menus.reduce((pre, cur) => {
				if (menu.pid === cur.menuid) {
					pre.push(...getParent(cur));
				}
				return pre;
			}, [] as SysMenuParam1[]);
		}
		logger.debug('m1', m1);
		const s = new Set<string>();
		return m1.reduce((pre, cur) => {
			pre.push(...getParent(cur));
			return pre;
		}, m1 as ITb01menu[]).filter((menu) => {
			if (s.has(menu.menuid)) {
				return false;
			}
			s.add(menu.menuid);
			return true;
		}).sort((a, b) => {
			return a.weight - b.weight;
		});
	},
	async setByRoleID(roleid: string, menuids: string[]) {
		// 新增数据插入,已有数据进行修改
		await tb01rolemenu().transaction(async (trx) => {
			const tb = tb01rolemenu().useTransaction(trx);
			const data = await tb
				.first({ roleid });
			if (data) {
				// 先执行删除,再进行重新插入
				await tb.delete({
					roleid
				});
			}
			await tb.insert(menuids.map((id) => {
				return {
					roleid: roleid,
					menuid: id
				};
			}));
		});
	},
	async search(keyword: string) {
		const { data } = await tbTb01menu()
			.list(['menuname'], keyword, 1, 0, {}, (qb) => {
				return qb
					// .whereNull('pid')
					.orderBy('pid', 'asc')
					.orderBy('weight', 'desc')
					.orderBy('menuname', 'asc');
			});
		return data;
	},
	list() {
		return tbTb01menu()
			.query()
			.orderBy('weight', 'desc');
	}
};
export default sysMenu;
