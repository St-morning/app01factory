import { Knex } from 'knex';
import tableWrap from '../../../atoms/server/table-wrap';
import getDb from '../db';
import { ITb01role } from '../table/tb01role';
import { ITb01user } from '../table/tb01user';

const db = getDb();

// 获取到所有的用户角色

/**
 * 用户-角色关联表
 */
export type IVUserRole = Pick<ITb01user, 'userid' | 'username' | 'sex' | 'phone' | 'ext'>
	& Pick<ITb01role, 'roleid' | 'rolename' | 'description'>;

/**
 * 用户角色视图
 */
export default function viewUserRole(trx?: Knex.Transaction) {
	const dbOrTrx = trx || db;
	function table() {
		return dbOrTrx.from<IVUserRole>(dbOrTrx(
			{
				tb1: 'tb01user',
				tb2: 'tb01userrole',
				tb3: 'tb01role',
			})
			.select({
				userid: 'tb1.userid',
				username: 'tb1.username',
				sex: 'tb1.sex',
				phone: 'tb1.phone',
				ext: 'tb1.ext',
				roleid: 'tb2.roleid',
				rolename: 'tb3.rolename',
				description: 'tb3.description',
			})
			.whereRaw('?? = ??', ['tb1.userid', 'tb2.userid'])
			.andWhereRaw('?? = ??', ['tb3.roleid', 'tb2.roleid'])
			.andWhereRaw('?? = ??', ['tb1.state', 1])
			.as('viewuserrole'));
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
