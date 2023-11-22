import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 招募信息表
 */
export interface ITbZhmxx {
	/**
	 * 招募信息编号
	 */
	zhmxxbh: string;	// text
	/**
	 * 招募岗位
	 */
	zhmgw: string;	// text
	/**
	 * 招募人数
	 */
	zhmrsh: number;	// smallint
	/**
	 * 报名方式
	 */
	bmfsh: string;	// text
	/**
	 * 报名开始时间
	 */
	bmkshshj: string;	// bigint
	/**
	 * 报名截止时间
	 */
	bmjzhshj: string;	// bigint
	/**
	 * 发布时间
	 */
	fbshj: string;	// bigint
}

type IData = ITbZhmxx;
const tableName = 'tbzhmxx';

/**
 * 招募信息表
 */
export default function tbZhmxx() {
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
