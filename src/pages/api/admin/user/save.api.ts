import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import { SysUserModifyParam } from '../../controllers/sys/user';

const logger = mmLogger('pages/api/admin/user/save.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserModifyParam;

/**
 * 保存用户信息
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
			description: `修改用户信息\t${ctrls.sysLog.strValue(req.body)}`,
			method: '修改',
			serverid: req.url,
			tablename: 'tb01user',
			userid: user?.userid || ''
		});

		await ctrls.sysUser.modify(msg);
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
