import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 角色菜单关联表
 */
export type ITb01rolemenu = {
	/**
	 * 角色ID
	 */
	roleid: string;	// text
	/**
	 * 菜单ID
	 */
	menuid: string;	// text
};

type IData = ITb01rolemenu;
const tableName = 'tb01rolemenu';

/**
 * 角色菜单关联表
 */
export default function tb01rolemenu() {
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
