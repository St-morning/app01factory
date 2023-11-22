import { join } from 'node:path';
import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';
import api from '../../../../../atoms/api';

const logger = mmLogger('pages/api/file/preview/imgs/[ids].api');

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
	ids: string;
}

/**
 * 预览多张图片
 */
const handler = createHandler<Result>();

const separator = '|';

handler.get((req, res) => {
	try {
		const { ids } = req.query as {
			ids: string;
		};
		const uris = ids.split(separator).map((id) => {
			const pathname = join(req.headers.host, api['/api/file/id'], join(api['/'], id));
			return `${req.headers.scheme}://${pathname}`;
		});
		logger.info('preview', uris);
		res.redirect(`/preview/picturesPreview?urls=${encodeURIComponent(ctrls.sysFile.base64encode(uris.join(separator)))}&watermarkTxt=${encodeURIComponent('01微工厂')}`);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
