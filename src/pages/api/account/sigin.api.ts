import { PageConfig } from 'next';
import { serialize } from 'cookie';
import ctrls from '../ctrls';
import { SysUserSigninParam } from '../controllers/sys/user';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import api from '../../../atoms/api';

const logger = mmLogger('pages/api/account/sigin.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = Pick<SysUserSigninParam, 'password' | 'userid'>;

/**
 * 登录
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const user = await ctrls.sysSession.getUser((name) => {
			return req.cookies[name];
		});
		await ctrls.sysLog.log({
			description: '用户登录',
			method: '未知',
			serverid: req.url,
			tablename: 'tb01user',
			userid: user?.userid || ''
		});
		await ctrls.sysUser.signin({
			password: msg.password,
			userid: msg.userid,
			setCookie(name, val) {
				return res.setHeader('Set-Cookie', serialize(name, val, {
					sameSite: 'lax',
					httpOnly: true,
					path: api['/']
				}));
			}
		});

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
