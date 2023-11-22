import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 菜单表
 */
export type ITb01menu = {
	/**
	 * 菜单ID
	 */
	menuid: string;	// text
	/**
	 * 菜单名称
	 */
	menuname: string;	// text
	/**
	 * 父级菜单ID
	 */
	pid: string;	// text
	/**
	 * 显示优先级
	 */
	weight: number;	// smallint
	/**
	 * 页面地址
	 */
	url: string;	// text
	/**
	 * 菜单图标
	 */
	icon: string;	// text
};

type IData = ITb01menu;
const tableName = 'tb01menu';

/**
 * 菜单表
 */
export default function tb01menu() {
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
