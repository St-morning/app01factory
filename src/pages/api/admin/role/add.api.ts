import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysRoleParam1 } from '../../controllers/sys/role';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/add.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysRoleParam1;

/**
 * 新增角色
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
			description: `新增角色\t${ctrls.sysLog.strValue(msg)}`,
			method: '新增',
			serverid: req.url,
			tablename: 'tb01role',
			userid: user?.userid || ''
		});

		await ctrls.sysRole.add(msg);
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
