import { Knex } from 'knex';
import tableWrap from '../../../atoms/server/table-wrap';
import getDb from '../db';
import { ITb01menu } from '../table/tb01menu';
import { ITb01role } from '../table/tb01role';

const db = getDb();

/**
 * 菜单角色视图
 */
export type IVMenuRole = ITb01menu & {
	roles: Array<Pick<ITb01role, 'roleid'>>;
};

/**
 * 菜单角色视图
 */
export default function viewMenuRole(trx?: Knex.Transaction) {
	const dbOrTrx = trx || db;
	function view() {
		return dbOrTrx.from<IVMenuRole>(dbOrTrx
			.select({
				menuid: 'tb1.menuid',
				menuname: 'tb1.menuname',
				pid: 'tb1.pid',
				weight: 'tb1.weight',
				url: 'tb1.url',
				icon: 'tb1.icon',
			})
			.select(dbOrTrx.raw('json_agg(json_build_object(\'roleid\', tb2.roleid)) as roles'))
			.from('tb01menu as tb1')
			.leftJoin('tb01rolemenu as tb2', (builder) => {
				return builder.on('tb1.menuid', 'tb2.menuid');
			})
			.groupBy('tb1.menuid', 'tb1.menuname', 'tb1.pid', 'tb1.weight', 'tb1.url', 'tb1.icon')
			.as('viewRoleMenu'));
	}
	return tableWrap(view);
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
