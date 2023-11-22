import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import { join } from 'node:path';
import api from '../../../../atoms/api';

const logger = mmLogger('pages/api/file/preview/[...ids].api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

/**
 * 预览图片
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		logger.debug('msg body:', req.query);
		logger.debug('msg body:', req.query);
		const { ids } = req.query as { ids: string[]; };
		const pathname = join(req.headers.host, api['/'], ids.join('/'));
		const uri = `${req.headers.scheme}://${pathname}`;
		logger.info('preview', uri);
		res.redirect(302, `/preview/onlinePreview?url=${encodeURIComponent(ctrls.sysFile.base64encode(uri))}&watermarkTxt=${encodeURIComponent('01微工厂')}`);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
