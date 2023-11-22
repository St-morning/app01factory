import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import RoleType from '../../../../db/01factory/type/role';

const logger = mmLogger('pages/api/admin/role/del.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = {
	roleid: string;
};

/**
 * 删除角色
 */
const handler = createHandler<Result>();

handler.delete(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const user = await ctrls.sysSession.getUser((name) => {
			return req.cookies[name];
		});
		await ctrls.sysLog.log({
			description: `删除角色\t${ctrls.sysLog.strValue(msg)}`,
			method: '删除',
			serverid: req.url,
			tablename: 'tb01role',
			userid: user?.userid || ''
		});

		await ctrls.sysRole.delByID(msg.roleid as RoleType);
		// logger.debug(13);
		res.status(200).json({
			ok: true,
			data: {}
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
