import { Knex } from 'knex';
import tableWrap from '../../../atoms/server/table-wrap';
import getDb from '../db';
import { ITb01group } from '../table/tb01group';
import { ITb01role } from '../table/tb01role';
import { ITb01user } from '../table/tb01user';

const db = getDb();

/**
 * 组-用户-角色视图
 */
export type IVGroupUserRole = Pick<ITb01user, 'userid' | 'username'>
	& ITb01group
	& {
		roles: Array<Pick<ITb01role, 'rolename' | 'roleid'>>;
	};

/**
 * 组-用户视图
 */
export default function viewGroupUserRole(trx?: Knex.Transaction) {
	const dbOrTrx = trx || db;
	function viewUser() {
		return dbOrTrx.from(dbOrTrx
			.select({
				userid: 'tb1.userid',
				username: 'tb1.username',
				groupid: 'tb2.groupid',
			})
			.from('tb01user as tb1')
			.leftJoin('tb01usergroup as tb2', (builder) => {
				return builder.on('tb1.userid', 'tb2.userid')
					// .andOnVal('tb2.groupid', groupid)
					.andOnVal('tb1.state', 1);
			})
			.as('viewUser'));
	}
	function viewGroupUser() {
		return dbOrTrx.from<Pick<ITb01user, 'userid' | 'username'>
			& ITb01group>(dbOrTrx
				.select({
					userid: 'v1.userid',
					username: 'v1.username',
					groupid: 'v1.groupid',
					groupname: 'tb1.groupname',
				})
				.from(viewUser().as('v1'))
				.leftJoin(' tb01group as tb1', (builder) => {
					return builder.on('v1.groupid', 'tb1.groupid');
				})
				.as('viewGroupUser'));
	}
	function viewUserRole() {
		return dbOrTrx.from<IVGroupUserRole>(dbOrTrx
			({
				tb1: 'tb01userrole',
				tb2: 'tb01role',
			})
			.select({
				userid: 'tb1.userid',
				roleid: 'tb2.roleid',
				rolename: 'tb2.rolename',
			})
			.whereRaw('?? = ??', ['tb1.roleid', 'tb2.roleid'])
			.as('viewUserRole'));
	}
	function view() {
		return dbOrTrx.from<IVGroupUserRole>(dbOrTrx
			.select({
				userid: 'v1.userid',
				username: 'v1.username',
				groupid: 'v1.groupid',
				groupname: 'v1.groupname',
			})
			.select(dbOrTrx.raw('json_agg(json_build_object(\'roleid\', v2.roleid, \'rolename\', v2.rolename)) as roles'))
			.from(viewGroupUser().as('v1'))
			.leftJoin(viewUserRole().as('v2'), (builder) => {
				return builder.on('v1.userid', 'v2.userid');
			})
			.groupBy('v1.userid', 'v1.username', 'v1.groupid', 'v1.groupname')
			.as('viewGroupUserRole'));
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
