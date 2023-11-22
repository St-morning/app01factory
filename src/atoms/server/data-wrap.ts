import { Knex } from 'knex';
import tableWrap from './table-wrap';

export default function dataWrap<T extends {} = any>(db: Knex<any, unknown[]>, tableName: string) {
	function table() {
		return db<T, T[]>(tableName);
	}
	return {
		/**
		 * 使用事务
		 */
		useTransaction(trx: Knex.Transaction) {
			function table() {
				return trx<T, T[]>(tableName);
			};
			return tableWrap(table);
		},
		/**
		 * 开启事务
		 */
		transaction<P>(transactionScope: (trx: Knex.Transaction) => Promise<P> | void,
			config?: Knex.TransactionConfig) {
			return db.transaction<P>(transactionScope, config);
		},
		...tableWrap(table)
	};
}
