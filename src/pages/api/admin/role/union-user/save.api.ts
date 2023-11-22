import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';
import RoleType from '../../../../../db/01factory/type/role';

const logger = mmLogger('pages/api/admin/role/union-user/save.api');

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
	userids: string[];
};

/**
 * 保存角色关联用户
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { roleid, userids } = req.body as Message;
		await ctrls.sysRole.setUserRole(roleid as RoleType, userids);
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
