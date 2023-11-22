import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';
import RoleType from '../type/role';

const db = get01factoryDb();

/**
 * 用户角色表关联表
 */
export type ITb01userrole = {
	/**
	 * 用户id
	 */
	userid: string;	// text
	/**
	 * 角色id
	 */
	roleid: RoleType;	// text
};

type IData = ITb01userrole;
const tableName = 'tb01userrole';

/**
 * 用户角色表关联表
 */
export default function tb01userrole() {
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
