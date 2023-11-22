import pagesize from '../../../../atoms/pagesize';
import mmLogger from '../../../../atoms/server/logger';
import uuid from '../../../../atoms/server/uuid';
import tb01role, { ITb01role } from '../../../../db/01factory/table/tb01role';
import tb01rolemenu from '../../../../db/01factory/table/tb01rolemenu';
import tb01userrole, { ITb01userrole } from '../../../../db/01factory/table/tb01userrole';
import RoleType from '../../../../db/01factory/type/role';
import viewMenuRole, { IVMenuRole } from '../../../../db/01factory/view/menurole';
import ctrls from '../../ctrls';

const logger = mmLogger('pages/api/controllers/sys/role');

export type SysRoleParam1 = Pick<ITb01role, 'rolename' | 'description'>;

export type SysRoleListParam = {
	// 当前页面
	page: string;
	// 用户查询关键字
	keyword: string;
};
export type SysRoleListResult = {
	data: ITb01role[];
	total: number;
};
export type SysRoleParam4 = ITb01userrole;
export type SysRoleParam5 = Pick<ITb01role, 'description' | 'roleid' | 'rolename'>;
export type SysRoleParam6 = IVMenuRole;

const sysRole = {
	listAllMenus() {
		return viewMenuRole()
			.query()
			.orderBy('weight', 'desc');
	},
	async setUserRole(roleid: RoleType, userids: string[]) {
		if (!roleid) {
			throw new Error('角色不存在');
		}
		// 查询全部用户
		const data = await ctrls.sysUser.all();
		// 数据处理
		const ids = userids.filter((it) => {
			return data.find((d) => {
				return d.userid === it;
			});
		});
		await tb01userrole().transaction(async (trx) => {
			const tb = tb01userrole().useTransaction(trx);
			// 编辑,先删除再进行新增
			const d = await tb.first({
				roleid
			});
			if (d) {
				await tb.delete({
					roleid
				});
			}
			await tb.insert(ids.map((userid) => {
				return {
					roleid,
					userid
				};
			}));
		});
	},
	async add(msg: SysRoleParam1) {
		const data = await tb01role()
			.first({
				rolename: msg.rolename
			});
		if (data) {
			throw new Error('角色名称重复,请重新输入');
		}
		// const user = await getuser(req);
		await tb01role().insert({
			roleid: uuid() as RoleType,
			rolename: msg.rolename,
			description: msg.description
		});
	},
	list(msg: SysRoleListParam) {
		const page = parseInt(msg.page || '1', 10);
		return tb01role()
			.list(['rolename',], msg.keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('roleid', 'asc');
			});
	},
	async delByID(roleid: RoleType) {
		if (!roleid) {
			throw new Error('该角色不存在');
		}
		await tb01role().transaction(async (trx) => {
			const tbRole = tb01role().useTransaction(trx);
			const tbUserRole = tb01userrole().useTransaction(trx);
			const tbRoleMenu = tb01rolemenu().useTransaction(trx);
			await tbUserRole.delete({
				roleid
			});
			await tbRoleMenu.delete({
				roleid
			});
			await tbRole.delete({
				roleid: roleid as RoleType
			});
		});
	},
	modify(msg: SysRoleParam5) {
		if (!msg.roleid) {
			throw new Error('该角色不存在');
		}
		return tb01role().update({
			rolename: msg.rolename,
			description: msg.description
		}, { roleid: msg.roleid });
	},
	getByID(roleid: string) {
		if (!roleid) {
			throw new Error('未找到该角色');
		}
		return tb01role().first({
			roleid: roleid as RoleType
		});
	},
	async saveMenu(roleid: string, menuids: string[]) {
		await tb01rolemenu().transaction(async (trx) => {
			const tb1 = tb01rolemenu().useTransaction(trx);
			await tb1.delete({
				roleid
			});
			await tb1.insert(menuids.map((menuid) => {
				return {
					menuid,
					roleid
				};
			}));
		});
	}
};

export default sysRole;
