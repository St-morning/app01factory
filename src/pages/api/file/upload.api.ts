import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import parseFiles from '../../../atoms/server/parse-files';

const logger = mmLogger('pages/api/upload');

export type File = {
	fileid: string;
	filename: string;
};

export type Result = File;

export type Message = {

}

export type Query = {

}

const handler = createHandler<Result>();

handler.put(async (req, res) => {
	try {
		logger.debug('put msg body:', req.body);
		const files = await parseFiles(req);
		const r = await ctrls.sysFile.upload(files);
		res.status(200).json({
			fileid: r.id,
			filename: r.name
		});
	} catch (error) {
		logger.error(error);
		res.status(500).end((error as Error).message);
	}
}).post(async (req, res) => {
	try {
		logger.debug('post msg body:', req.body);
		const files = await parseFiles(req);
		const r = await ctrls.sysFile.upload(files);
		res.status(200).json({
			fileid: r.id,
			filename: r.name
		});
	} catch (error) {
		logger.error(error);
		res.status(500).end((error as Error).message);
	}
});

export const config: PageConfig = {
	api: {
		bodyParser: false
	}
};

export default handler;
