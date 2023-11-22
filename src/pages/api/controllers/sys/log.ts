import dt2timeStamp from '../../../../atoms/dt/to-time-stamp';
import pagesize from '../../../../atoms/pagesize';
import mmLogger from '../../../../atoms/server/logger';
import uuid from '../../../../atoms/server/uuid';
import tbTb01log, { ITb01log } from '../../../../db/01factory/table/tb01log';
import ctrls from '../../ctrls';

const logger = mmLogger('pages/api/controllers/sys/log');

export type SysLogListParam = {
	page: string;
	keyword: string;
	start: string;
	end: string;
};
export type SysLogGetByIDParam = Pick<ITb01log, 'logid'>;
export type SysLogLogParam = Pick<ITb01log, 'description' | 'serverid' | 'tablename' | 'userid'> & {
	method: '新增' | '修改' | '删除' | '未知';
};
export type SysLogParam4 = 'tb01group' | 'tb01log' | 'tb01menu' | 'tb01role' | 'tb01rolemenu' | 'tb01sys' | 'tb01user' | 'tb01usergroup' | 'tb01userrole';

const sysLog = {
	list(msg: SysLogListParam) {
		const page = parseInt(msg.page || '1', 10);
		// 开始/结束时间
		const start = dt2timeStamp(msg.start);
		const end = dt2timeStamp(msg.end);
		// 通过服务名、操作表类型、操作人、操作类型字段查询
		return tbTb01log()
			.list(['serverid', 'tablename', 'userid', 'description'], msg.keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('tm', 'desc');
			}, (qb) => {
				if (start > 0 && end > 0) {
					return qb.whereBetween('tm', [start, end]);
				}
				return qb;
			});
	},
	getByID({ logid }: SysLogGetByIDParam) {
		return tbTb01log().first({
			logid
		});
	},
	async log(param: SysLogLogParam) {
		const { method, description, serverid, tablename, userid } = param;
		const type = (() => {
			switch (method) {
				case '新增':
					return 0;
				case '修改':
					return 1;
				case '删除':
					return 2;
				case '未知':
				default:
					return 3;
			}
		})();
		// const body = strValue(req.body);
		// const query = strValue(req.query);
		// const description = `${msgs.map((msg) => {
		// 	return JSON.stringify(msg);
		// }).join('\t')}\tquery:[${query}]\tbody:[${body}]`;
		await tbTb01log()
			.insert({
				logid: uuid(),
				userid,
				type,
				description,
				tablename,
				serverid,
				tm: Date.now().toString()
			});
		const msg = `${userid}执行了对表${tablename}的${method}操作.\t\t\t${description}`;
		logger.debug(msg);
	},
	strValue(val: any) {
		try {
			return JSON.stringify(val, null, '\t');
		} catch (error) {
			return error.toString();
		}
	}
};
export default sysLog;

