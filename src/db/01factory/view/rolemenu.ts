import { Knex } from 'knex';
import tableWrap from '../../../atoms/server/table-wrap';
import getDb from '../db';
import { ITb01menu } from '../table/tb01menu';
import { ITb01role } from '../table/tb01role';

const db = getDb();

/**
 * 角色菜单视图
 */
export type IVRoleMenu = Pick<ITb01role, 'roleid'>
	& ITb01menu;

/**
 * 角色菜单视图
 */
export default function viewRoleMenu(trx?: Knex.Transaction) {
	const dbOrTrx = trx || db;
	function table() {
		return dbOrTrx.from<IVRoleMenu>(dbOrTrx(
			{
				tb1: 'tb01rolemenu',
				tb2: 'tb01menu'
			})
			.select({
				roleid: 'tb1.roleid',
				menuid: 'tb2.menuid',
				menuname: 'tb2.menuname',
				pid: 'tb2.pid',
				weight: 'tb2.weight',
				url: 'tb2.url',
				icon: 'tb2.icon'
			})
			.whereRaw('?? = ??', ['tb1.menuid', 'tb2.menuid'])
			.as('viewrolemenu'));
	}
	return tableWrap(table);
	// return {
	// 	/**
	// 	 * sql查询 ！！！ 慎用
	// 	 */
	// 	raw<T = any>(sql: string, ...bindings: any[]) {
	// 		return db.raw(sql, ...bindings) as unknown as T;
	// 	},
	// 	...tableWrap(table)
	// };
}
