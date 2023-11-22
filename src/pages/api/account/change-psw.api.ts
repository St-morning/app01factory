import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import { SysUserChangePasswordParam } from '../controllers/sys/user';

const logger = mmLogger('pages/api/account/change-psw.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = Pick<SysUserChangePasswordParam, 'newpsw' | 'oldpsw'>;

/**
 * 修改密码
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
			description: `修改密码\t${ctrls.sysLog.strValue(msg)}`,
			method: '修改',
			serverid: req.url,
			tablename: 'tb01user',
			userid: user?.userid || ''
		});

		await ctrls.sysUser.changePassword({
			getCookie(name) {
				return req.cookies[name];
			},
			newpsw: msg.newpsw,
			oldpsw: msg.oldpsw
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
