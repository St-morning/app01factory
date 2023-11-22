import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';
import { SysGroupSaveusersParam, SysGroupSaveusersResult } from '../../../controllers/sys/group';

const logger = mmLogger('pages/api/admin/group/union-user/save.api');

export type Data = SysGroupSaveusersResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysGroupSaveusersParam;

/**
 * 保存关联用户
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysGroup.saveUsers(msg);
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
