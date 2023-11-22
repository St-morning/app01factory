import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 用户组别表
 */
export type ITb01group = {
	/**
	 * 组别id
	 */
	groupid: string;	// text
	/**
	 * 组别名称
	 */
	groupname: string;	// text
};

type IData = ITb01group;
const tableName = 'tb01group';

/**
 * 用户组别表
 */
export default function tb01group() {
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
