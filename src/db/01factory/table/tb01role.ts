import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';
import RoleType from '../type/role';

const db = get01factoryDb();

/**
 * 角色表
 */
export type ITb01role = {
	/**
	 * 角色id
	 */
	roleid: RoleType;	// text
	/**
	 * 角色名称
	 */
	rolename: string;	// text
	/**
	 * 角色描述
	 */
	description: string;	// text
};

type IData = ITb01role;
const tableName = 'tb01role';

/**
 * 角色表
 */
export default function tb01role() {
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
