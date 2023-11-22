import { PageConfig } from 'next';
import doccode from '../../atoms/doccode';
import createHandler from '../../atoms/server/handler';
import mmLogger from '../../atoms/server/logger';

const logger = mmLogger('pages/api/doccode.api');

export type Result = string[];

export type Message = {
	name: string;
	num: number;
	len: number;
}

/**
 * 编码服务
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { name, len, num } = req.body as Message;
		const codes = await doccode(name, num, len);
		res.status(200).json(codes);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(500).json([]);
	}
});

export const config: PageConfig = {};

export default handler;
