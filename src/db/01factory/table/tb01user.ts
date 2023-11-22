import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 用户表
 */
export type ITb01user = {
	/**
	 * 用户名
	 */
	userid: string;	// text
	/**
	 * 姓名
	 */
	username: string;	// text
	/**
	 * 性别：0 女 1 男
	 */
	sex: number;	// smallint
	/**
	 * 密码
	 */
	password: string;	// text
	/**
	 * 手机号
	 */
	phone: string;	// text
	/**
	 * 逻辑删除标识：0 删除 1 在用
	 */
	state: number;	// smallint
	/**
	 * 额外用户信息
	 */
	ext: {
		/**
		* 邮箱
		*/
		email: string;	// text
		/**
		* 身份证号
		*/
		idno: string;	// text
		/**
		* 用户头像
		*/
		avatar: string;	// text
	};	// jsonb
};

type IData = ITb01user;
const tableName = 'tb01user';

/**
 * 用户表
 */
export default function tb01user() {
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
