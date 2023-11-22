import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import api from '../../../../atoms/api';

const logger = mmLogger('pages/api/file/preview/[id].api');

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
 * 文件预览
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		logger.debug('msg body:', req.query);
		logger.debug('msg body:', req.query);
		const { id } = req.query as {
			id: string;
		};
		const uri = `${req.headers.scheme}://${req.headers.host}${api['/api/file/id']}/${id}`;
		logger.info('preview', uri);
		res.redirect(`/preview/onlinePreview?url=${encodeURIComponent(ctrls.sysFile.base64encode(uri))}&watermarkTxt=${encodeURIComponent('01微工厂')}`);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
