import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/file/delete.api');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	/**
	 * 文件id
	 */
	id: string;
};

/**
 * 文件删除
 */
const handler = createHandler<Result>();

handler.delete(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const id = msg.id;
		await ctrls.sysFile.remove(id);
		res.status(200).json({ ok: true });
	} catch (error) {
		const msg = (error as Error).message;
		logger.error(error);
		res.status(500).end(msg);
	}
});

export const config: PageConfig = {};

export default handler;
