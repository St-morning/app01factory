import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 用户组别关联表
 */
export type ITb01usergroup = {
	/**
	 * 组别id
	 */
	groupid: string;	// text
	/**
	 * 用户id
	 */
	userid: string;	// text
};

type IData = ITb01usergroup;
const tableName = 'tb01usergroup';

/**
 * 用户组别关联表
 */
export default function tb01usergroup() {
	return dataWrap<IData>(db, tableName);
	// return {
	// 	/**
	// 	 * sql查询 ！！！ 慎用
	// 	 */
	// 	raw<T = any>(sql: string, ...bindings: any[]) {
	// 		return db.raw(sql, ...bindings) as unknown as T;
	// 	},
	// 	...dataWrap<IData>(db, tableName)
	// };
}
