
import { PageConfig } from 'next';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/file/watermark.api');

export type Result = {
	ok: true;
	fileid: string;
} | {
	ok: false;
	message: string;
};

/**
 * 图片添加水印
 */
const handler = createHandler<Result>();

handler.put((req, res) => {
	try {
		//logger.debug('msg body:', req.body);
		// 解析并保存文件
		res.status(200).json({ ok: false, message: 'Not Realized.' });
		// const r = await ctrls.sysFile.waterflow({ req });
		// res.status(200).json({ ok: true, fileid: r.id });
	} catch (error) {
		logger.error(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
}).post((req, res) => {
	try {
		//logger.debug('msg body:', req.body);
		// 解析并保存文件
		res.status(200).json({ ok: false, message: 'Not Realized.' });
		// const r = await ctrls.sysFile.waterflow({ req });
		// res.status(200).json({ ok: true, fileid: r.id });
	} catch (error) {
		logger.error(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {
	api: {
		bodyParser: false
	}
};

export default handler;
