import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import RoleType from '../../../../db/01factory/type/role';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import { serialize } from 'cookie';
import api from '../../../../atoms/api';

const logger = mmLogger('pages/api/account/rolechoose/switch-role.api');

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
	rolename: string
};

/**
 * 切换角色
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const { roleid, rolename } = msg;
		const user = await ctrls.sysSession.getUser((name) => {
			return req.cookies[name];
		});
		await ctrls.sysLog.log({
			description: `切换角色\t${ctrls.sysLog.strValue(msg)}`,
			method: '未知',
			serverid: req.url,
			tablename: 'tb01userrole',
			userid: user?.userid || ''
		});
		await ctrls.sysSession.switchRole({
			getCookie(name) {
				return req.cookies[name];
			},
			roleid: roleid as RoleType,
			rolename,
			setCookie(name, val) {
				return res.setHeader('Set-Cookie', serialize(name, val, {
					sameSite: 'lax',
					httpOnly: true,
					path: api['/']
				}));
			}

		});
		// await ctrls.sysSession.switchRole(req, res, roleid as RoleType, rolename);
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
