import { join } from 'node:path';
import { PageConfig } from 'next';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import api from '../../../atoms/api';

const logger = mmLogger('pages/api/getfile/[...ids]');

export type Result = void;

export type Query = {
	id: string;
	download?: string;
}

/**
 * 静态图片展示,用于统一处理静态图片和图片文件id的图片展示
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		const { ids } = req.query as { ids: string[]; };
		// http://mywebsite/file/images/foo.jpg 转换为 http://mywebsite/images/foo.jpg 图片
		res.redirect(302, join(api['/'], ids.join('/')));
	} catch (error) {
		logger.trace(error);
		res.status(404).end((error as Error).message);
	}
});

export const config: PageConfig = {};

export default handler;
