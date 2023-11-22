import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import { SysRoleParam6 } from '../../../controllers/sys/role';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/union-menu/list-menus.api');

export type Data = SysRoleParam6;

export type Result = {
	ok: true;
	data: Data[];
} | {
	ok: false;
	message: string;
};

export type Message = {

};

/**
 * 获取全部菜单
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const data = await ctrls.sysRole.listAllMenus();
		res.status(200).json({
			ok: true,
			data
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
