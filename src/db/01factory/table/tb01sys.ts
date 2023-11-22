import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 系统表
 */
export type ITb01sys = {
	/**
	 * 键
	 */
	key: string;	// text
	/**
	 * 值
	 */
	value: string;	// text
};

type IData = ITb01sys;
const tableName = 'tb01sys';

/**
 * 系统表
 */
export default function tb01sys() {
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
