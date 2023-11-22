import { PageConfig } from 'next';
import ctrls from '../ctrls';
import { SysMenuParam1 } from '../controllers/sys/menu';
import { SysSessionSetUserParam } from '../controllers/sys/session';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/account/get-page-info.api');

export type Data = {
	user: SysSessionSetUserParam;
	menus: SysMenuParam1[];
	appname: string;
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = {

};

/**
 * 获取帐户信息，包括用户菜单和用户信息
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const user = await ctrls.sysSession.getUser((name) => {
			return req.cookies[name];
		});
		const menus = await ctrls.sysMenu.getByRoleID(user?.roleid);
		logger.debug('menus', menus);
		const appname = await ctrls.sysConfig.getSysName();
		res.status(200).json({
			ok: true,
			data: {
				user,
				menus,
				appname
			}
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
