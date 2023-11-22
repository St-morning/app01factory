import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 编码表
 */
export type ITb01doccode = {
	/**
	 * 编码代号
	 */
	name: string;	// character varying(255)
	/**
	 * 编码数字位长度
	 */
	len: number;	// integer
	/**
	 * 当前编号
	 */
	code: string;	// bigint
};

type IData = ITb01doccode;
const tableName = 'tb01doccode';

/**
 * 编码表
 */
export default function tb01doccode() {
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
