import fs from 'node:fs';
import os from 'node:os';
import { Readable } from 'node:stream';
import exceljs, { Cell, CellErrorValue, CellFormulaValue, CellHyperlinkValue, CellRichTextValue, Row, Worksheet } from 'exceljs';
import { Knex } from 'knex';
import mmLogger from '../../../../atoms/server/logger';
import get01factoryDb from '../../../../db/01factory/db';
import ctrls from '../../ctrls';
import uuid from '../../../../atoms/server/uuid';

const { ValueType, Workbook } = exceljs;

const logger = mmLogger('pages/api/controllers/sys/tbimpexp');

export type SysTbimpexpExpParam = {
	tableName: string;
	tableAlias: string;
	setHeader(name: string, value: string): Promise<void>;
	sendStream(stream: Readable): Promise<void>;
};
export type SysTbimpexpResult4 = {
	name: string;
	alias: string;
};
export type SysTbimpexplistAllTableNameParam = {
	name: string;
	alias: string;
};
export type SysTbimpexpImpParam = string;

/**
 * 数据表导入导出
 */
const sysTbimpexp = {
	/**
	* 导入
	*/
	async imp(filepath: SysTbimpexpImpParam) {
		if (process.env.NODE_ENV === 'production') {
			logger.error('Someone is trying to hack us.');
			return false;
		}
		const wb = new Workbook();
		await wb.xlsx.readFile(filepath);
		if (wb.worksheets.length === 0) {
			throw new Error('无法获取表数据');
		}

		const db = get01factoryDb();
		return db.transaction<void>(async (trs) => {
			const ps = wb.worksheets.map(async (ws) => {
				const sheetname = ws.name.trim();
				logger.debug('正在导入表...', sheetname);
				const { mapfields, tablename } = await importtable(ws, sheetname, trs);
				await importdata(ws, tablename, mapfields, sheetname, trs);
				logger.debug('导入表成功', tablename, sheetname);
			});
			await Promise.all(ps);
		});
	},
	async exp(param: SysTbimpexpExpParam) {
		logger.debug('exp', param);
		const { tableAlias, tableName, setHeader, sendStream } = param;
		const wb = new Workbook();
		const ws = wb.addWorksheet(tableAlias, {});
		ws.pageSetup = {
			orientation: 'portrait',
			fitToWidth: 1,
			// printTitlesRow: '1:4',
			// printTitlesColumn: 'a:l',
			paperSize: 9,	// a4
			margins: {
				left: 0.5,
				right: 0.5,
				top: 0.5,
				bottom: 0.5,
				header: 0.5,
				footer: 0.5
			}
		};
		const db = get01factoryDb();
		ws.addRow(['表名', tableName]);
		const fields = await new PG().getFields(db, tableName);
		ws.addRow(['字段名', ...fields.map((field) => {
			return field.fieldName;
		})]);
		ws.addRow(['中文注释', ...fields.map((field) => {
			return field.fieldAlias;
		})]);
		ws.addRow(['字段类型', ...fields.map((field) => {
			return field.fieldDbType;
		})]);
		// 查询表数据
		const dt = db(tableName);
		const data = await dt.select(...fields.map((field) => {
			return field.fieldName;
		}));
		logger.debug('正在导出数据', tableName, tableAlias, data);
		// 导出数据
		ws.addRows(data.map((row, idx) => {
			return ['', ...fields.map((field) => {
				return row[field.fieldName];
			})];
		}));
		const filename = `${tableAlias}.xlsx`;
		await setHeader('Content-Type', 'application/vnd.ms-excel');
		await setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(filename)}`);
		const tmp = os.tmpdir();
		const fn = uuid();
		const filepath = `${tmp}/${fn}`;
		await wb.xlsx.writeFile(filepath);
		const stream = fs.createReadStream(filepath);
		await sendStream(stream);
		// fs.rmSync(filepath);
	},
	listAllTableName() {
		const db = get01factoryDb();
		return new PG().getAllTables(db);
	}
};

export default sysTbimpexp;

function getcellvaluestr(cell: Cell) {
	const value = cell.value;
	switch (cell.type) {
		case ValueType.Boolean:
		case ValueType.Date:
		case ValueType.Number:
			return value?.toString().trim() || '';
		case ValueType.Error:
			return (value as CellErrorValue).error as string;
		case ValueType.Formula:
			return ((value as CellFormulaValue).result as string).toString().trim();
		case ValueType.Hyperlink:
			return (value as CellHyperlinkValue).text.toString().trim();
		case ValueType.Null:
			return '';
		case ValueType.RichText:
			return (value as CellRichTextValue).richText.map((v) => {
				return v.text.toString();
			}).join('').trim();
		case ValueType.Merge:
		case ValueType.SharedString:
		case ValueType.String:
		default:
			return value?.toString()?.trim() || '';
	}
}

function getworksheetcelltext(ws: Worksheet, cellname: string) {
	return getcellvaluestr(ws.getCell(cellname));
}

function getrowcelltext(row: Row, columnindex: number) {
	return getcellvaluestr(row.getCell(columnindex));
}

type filedtype = 'smallint' | 'int' | 'interger' | 'long' | 'bigint' | 'float' | 'double' | 'date' | 'datetime' | 'timestamp' | 'text' | 'varchar' | 'json' | 'jsonb';

type IFieldinfo = {
	alias: string;
	type: filedtype;
};

type Filedsinfo = Map<string, IFieldinfo>;

async function importtable(ws: Worksheet, sheetname: string, db: Knex.Transaction) {
	const tablealias = sheetname;
	const tablename = getworksheetcelltext(ws, 'B1').toLowerCase() || ctrls.sysUtils.getPinYin(tablealias);
	logger.debug('正在导入表结构...', tablename, sheetname);
	const rowfields = ws.getRow(2);
	const rowfieldsalias = ws.getRow(3);
	const rowfieldstype = ws.getRow(4);
	let idx = 1;	// 跳过第一列
	const mapfields = new Map<string, IFieldinfo>();
	const column_size = ws.actualColumnCount + 10;
	while (++idx <= column_size) {
		const alias = getrowcelltext(rowfieldsalias, idx);
		const value = getrowcelltext(rowfields, idx) || ctrls.sysUtils.getPinYin(alias);
		if (value) {
			const fieldname = value.toLowerCase();
			const type = getrowcelltext(rowfieldstype, idx) as filedtype;
			mapfields.set(fieldname, {
				alias,
				type
			});
		}
	}
	const fields = Array.from(mapfields.keys());
	if (fields.length === 0) {
		logger.error('无法获取到表字段,中止导入', tablename, sheetname);
		throw new Error(`无法获取到表字段,中止导入${tablename}${sheetname}`);
	}
	if (await db.schema.hasTable(tablename)) {
		const pg = new PG();
		const fields = await pg.getFields(db, tablename);
		const mapfields = fields.reduce((pre, cur) => {
			return pre.set(cur.fieldName, {
				alias: cur.fieldAlias,
				type: cur.fieldDbType as filedtype,
			});
		}, new Map<string, IFieldinfo>());
		return {
			tablename,
			mapfields
		};
	} else {
		// await db.schema.dropTableIfExists(tablename);
		await db.schema.createTable(tablename, (builder) => {
			builder.comment(tablealias);
			fields.forEach((field) => {
				const { alias, type } = mapfields.get(field)!;
				switch (type) {
					case 'int':
					case 'interger':
						builder.integer(field).comment(alias);
						break;
					case 'long':
					case 'bigint':
						builder.bigInteger(field).comment(alias);
						break;
					case 'float':
						builder.float(field).comment(alias);
						break;
					case 'double':
						builder.double(field).comment(alias);
						break;
					case 'date':
					case 'datetime':
					case 'timestamp':
						builder.bigInteger(field).comment(alias);
						break;
					case 'smallint':
						builder.integer(field).comment(alias);	// todo
						break;
					case 'text':
					case 'varchar':
					default:
						builder.text(field).comment(alias);
						break;
				}
			});
		});
		logger.debug('成功导入表结构', tablename, sheetname);
		return {
			tablename,
			mapfields
		};
	}
}

async function importdata(ws: Worksheet, tablename: string, fieldsinfo: Filedsinfo, sheetname: string, db: Knex.Transaction) {
	logger.debug('正在导入表数据...', tablename, sheetname);
	const rowheader = ws.getRow(2);
	let columnindex = 0;
	const mapfields = new Map<string, number>();
	const column_size = ws.actualColumnCount + 10;
	while (++columnindex <= column_size) {
		const value1 = getrowcelltext(rowheader, columnindex);
		if (value1) {
			const fieldname = value1.toLowerCase();
			const fieldinfo = fieldsinfo.get(fieldname);
			if (fieldinfo) {
				mapfields.set(fieldname, columnindex);
			}
		}
	}
	const tb = db(tablename);
	const fields = Array.from(mapfields.keys());
	let rowindex = 4;	// skip 4 rows
	const datas = [];
	const now = Date.now();
	const rowsize = ws.actualRowCount + 10;
	while (++rowindex <= rowsize) {
		const row = ws.getRow(rowindex);
		if (row && row.hasValues) {
			const data = fields.reduce((data, field) => {
				const value = getrowcelltext(row, mapfields.get(field)!);
				const fieldinfo = fieldsinfo.get(field)!;
				if (fieldinfo.type === 'date'
					|| fieldinfo.type === 'datetime'
					|| fieldinfo.type === 'timestamp') {
					const tm = new Date(value).getTime();
					if (isNaN(tm)) {
						data[field] = now;
					} else {
						data[field] = tm;
					}
				} else if (fieldinfo.type === 'float'
					|| fieldinfo.type === 'double') {
					data[field] = Number(value);
				} else if (fieldinfo.type === 'int'
					|| fieldinfo.type === 'interger'
					|| fieldinfo.type === 'smallint') {
					data[field] = Number(value);
				} else if (fieldinfo.type === 'json'
					|| fieldinfo.type === 'jsonb') {
					data[field] = value || '{}';
				} else {
					data[field] = value;
				}
				logger.debug('vvvvvvvv', typeof value, value, fieldinfo);
				return data;
			}, {} as Record<string, string | number>);
			if (Object.keys(data).length > 0) {
				datas.push(data);
			}
		}
	}
	try {
		logger.debug('准备导入数据', datas);
		// clear data
		await tb.truncate();
		// then insert
		if (datas.length > 0) {
			await tb.insert(datas);
		}
		logger.debug('成功导入表数据', tablename, sheetname);
	} catch (error) {
		logger.error('失败', tablename, sheetname, datas);
		logger.error(error);
		throw error;
	}
}

type TablePg = {
	table_name: string;
	table_comment: string;
};

type ColumnPg = {
	column_name: string;
	column_default: string;
	is_nullable: string;
	data_type: string;
	column_type: string;
	column_key: string;
	column_comment: string;
	table_schema: string;
	table_name: string;
	ordinal_position: number;
};

abstract class Base {
	protected gettype(type: string) {
		type = type && type.toLowerCase();
		if (/character\svarying\(\d+\)/.test(type)) {
			return 'string';
		}
		if (/character\(\d+\)/.test(type)) {
			return 'string';
		}
		if (/geometry\(.+\)/.test(type)) {
			return 'unknown';
		}
		// numeric(20,15)
		if (/numeric\(\d+(,\d+)\)/.test(type)) {
			return 'number';
		}
		switch (type) {
			case 'money':
				return 'string | number';
			case 'int':
			case 'integer':
			case 'decimal':
			case 'smallint':
			case 'float':
			case 'tinyint':
			case 'double':
			case 'double precision':
			case 'real':
				return 'number';
			case 'char':
			case 'varchar':
			case 'longtext':
			case 'text':
			case 'time':
			case 'tinytext':
			case 'cstring':
			case 'name':
			case '"char"':
			case 'oid':
			case 'xid':
			case 'bigint':
			case 'mediumtext':
				return 'string';
			case 'date':
			case 'datetime':
			case 'timestamp':
				return 'Date';
			case 'boolean':
				return 'boolean';
			case 'timestamp with time zone':
				return 'Date';
			case 'double precision[]':
				return 'number[]';
			case 'boolean[]':
			case 'oid[]':
			case 'text[]':
			case '"char"[]':
				return 'string[]';
			case 'real[]':
			case 'aclitem[]':
			case 'anyarray':
				return 'unknown[]';
			case 'bytea':
			case 'geometry':
			case 'information_schema.sql_identifier':
			case 'information_schema.cardinal_number':
			case 'information_schema.character_data':
			case 'information_schema.yes_or_no':
			case 'information_schema.time_stamp':
			case 'blob':
			case 'enum':
			case 'longblob':
			case 'json':
			case 'binary':
			case 'varbinary':
			case 'set':
			default:
				return 'unknown';
		}
	}
}

class PG extends Base {
	public async getAllTables(db: Knex) {
		const tbs = await db.raw<{ rows: TablePg[]; }>('select relname as table_name,cast(obj_description(oid,\'pg_class\') as varchar) as table_comment from pg_class where relkind = \'r\' and relnamespace=(select oid from pg_namespace where nspname=\'public\') order by relname;');
		return tbs.rows.map((tb) => {
			return {
				name: tb.table_name,
				alias: tb.table_comment
			};
		});
	}

	public async getFields(db: Knex, tableName: string) {
		const tbname = tableName;
		const data = await db.raw<{ rows: ColumnPg[]; }>('select a.attnum,(select description from pg_catalog.pg_description where objoid=a.attrelid and objsubid=a.attnum) as column_comment ,a.attname as column_name,pg_catalog.format_type(a.atttypid,a.atttypmod) as data_type from pg_catalog.pg_attribute a where a.attrelid=(select oid from pg_class where relname=?) and a.attnum>0 and not a.attisdropped order by a.attnum;', tbname);
		return data.rows.map((c) => {
			const type = this.gettype(c.data_type);
			return {
				fieldName: c.column_name,
				fieldType: type,
				fieldDbType: c.data_type,
				fieldAlias: c.column_comment ? c.column_comment.trim() : ''
			};
		});
	}
}

// type TableMysql = {
// 	table_schema: string;
// 	TABLE_SCHEMA: string;
// 	table_name: string;
// 	TABLE_NAME: string;
// 	ordinal_position: number;
// 	ORDINAL_POSITION: number;
// 	table_comment: string;
// 	TABLE_COMMENT: string;
// };

// type ColumnMysql = {
// 	column_name: string;
// 	COLUMN_NAME: string;
// 	column_default: string;
// 	COLUMN_DEFAULT: string;
// 	is_nullable: string;
// 	IS_NULLABLE: string;
// 	data_type: string;
// 	DATA_TYPE: string;
// 	column_type: string;
// 	COLUMN_TYPE: string;
// 	column_key: string;
// 	COLUMN_KEY: string;
// 	column_comment: string;
// 	COLUMN_COMMENT: string;
// 	table_schema: string;
// 	TABLE_SCHEMA: string;
// 	table_name: string;
// 	TABLE_NAME: string;
// 	ordinal_position: number;
// 	ORDINAL_POSITION: number;
// };

// class Mysql extends Base {
// 	public async getAllTables(db: Knex, dbname: string) {
// 		const tb1 = db<TableMysql>('information_schema.tables');
// 		const tbs = await tb1.select('table_name', 'table_comment').where({
// 			table_schema: dbname
// 		}) as TableMysql[];
// 		return tbs.map((tb) => {
// 			return {
// 				name: tb.table_name || tb.TABLE_NAME,
// 				alias: tb.table_comment || tb.TABLE_COMMENT
// 			};
// 		});
// 	}

// 	public async getFields(db: Knex, dbname: string, tableName: string) {
// 		const tbname = tableName;
// 		const tb2 = db<ColumnMysql>('information_schema.columns');
// 		const data = await tb2.select('column_name', /*'is_nullable',*/ 'data_type', 'column_comment').where({
// 			table_schema: dbname,
// 			table_name: tbname
// 		}).orderBy('ordinal_position', 'asc') as ColumnMysql[];
// 		return data.map((c) => {
// 			const fieldDbType = c.data_type || c.DATA_TYPE;
// 			const fieldType = this.gettype(fieldDbType);
// 			const fieldAlias = c.column_comment || c.COLUMN_COMMENT;
// 			return {
// 				fieldName: c.column_name || c.COLUMN_NAME,
// 				fieldType,
// 				fieldDbType,
// 				fieldAlias: fieldAlias ? fieldAlias.trim() : ''
// 			};
// 		});
// 	}
// }
