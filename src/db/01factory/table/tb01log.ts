import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 日志
 */
export type ITb01log = {
	/**
	 * 操作记录id
	 */
	logid: string;	// text
	/**
	 * 操作人id
	 */
	userid: string;	// text
	/**
	 * 操作类型(0新增 1修改 2删除 3未知)
	 */
	type: number;	// smallint
	/**
	 * 操作内容
	 */
	description: string;	// text
	/**
	 * 操作表名
	 */
	tablename: string;	// text
	/**
	 * 服务地址
	 */
	serverid: string;	// text
	/**
	 * 操作时间
	 */
	tm: string;	// bigint
};

type IData = ITb01log;
const tableName = 'tb01log';

/**
 * 日志
 */
export default function tb01log() {
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
