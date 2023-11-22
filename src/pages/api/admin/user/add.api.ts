import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysUserAddParam } from '../../controllers/sys/user';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/user/add.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserAddParam;

/**
 * 新增用户
 */
const handler = createHandler<Result>();

handler.put(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const user = await ctrls.sysSession.getUser((name) => {
			return req.cookies[name];
		});
		await ctrls.sysLog.log({
			description: ctrls.sysLog.strValue(msg),
			method: '新增',
			serverid: req.url,
			tablename: 'tb01user',
			userid: user?.userid || ''
		});

		await ctrls.sysUser.add(msg);
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
