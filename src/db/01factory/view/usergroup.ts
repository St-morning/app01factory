import { Knex } from 'knex';
import tableWrap from '../../../atoms/server/table-wrap';
import getDb from '../db';
import { ITb01group } from '../table/tb01group';
import { ITb01user } from '../table/tb01user';

const db = getDb();

/**
 * 用户-组视图
 */
export type IVUserGroup = Pick<ITb01user, 'userid' | 'username'>
	& {
		groups: ITb01group[];
	};

/**
 * 用户-组视图
 */
export default function viewUserGroup(trx?: Knex.Transaction) {
	const dbOrTrx = trx || db;
	function viewUser() {
		return dbOrTrx.from<Pick<ITb01user, 'userid' | 'username'>
			& Pick<ITb01group, 'groupid'>>(dbOrTrx
				.select({
					userid: 'tb1.userid',
					username: 'tb1.username',
					groupid: 'tb2.groupid',
				})
				.from('tb01user as tb1')
				.leftJoin('tb01usergroup as tb2', (builder) => {
					return builder.on('tb1.userid', 'tb2.userid')
						.andOnVal('tb1.state', 1);
				})
				.as('viewUser'));
	}
	function viewFlat() {
		return dbOrTrx.from<Pick<ITb01user, 'userid' | 'username'>
			& Pick<ITb01group, 'groupid' | 'groupname'>>(dbOrTrx
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
				.as('viewFlat'));
	}
	function view() {
		return dbOrTrx.from<IVUserGroup>(dbOrTrx.select({
			userid: 'v1.userid',
			username: 'v1.username'
		})
			.select(dbOrTrx.raw('json_agg(json_build_object(\'groupid\', v1.groupid, \'groupname\', v1.groupname)) as groups'))
			// .select(db.raw('to_jsonb(json_agg(json_build_object(\'groupid\', v1.groupid, \'groupname\', v1.groupname))) as groups'))
			.from(viewFlat().as('v1'))
			.groupBy('v1.userid', 'v1.username')
			.as('viewUserGroup'));
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
