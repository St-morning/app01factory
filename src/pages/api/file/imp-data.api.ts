import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import parseFiles from '../../../atoms/server/parse-files';

const logger = mmLogger('pages/api/dataimp/impexcel.api');

export type Result = boolean;

/**
 * 解析数据定义Excel并在数据库创建表,同时导入数据
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		const [file] = await parseFiles(req);
		const haserror = await ctrls.sysTbimpexp.imp(file.path);

		if (haserror) {
			res.status(500).json(false);
		} else {
			res.status(200).json(true);
		}
	} catch (e) {
		logger.error('Error while importing excel', e);
		res.status(500).end((e as Error).message);
	}
});

export const config: PageConfig = {
	api: {
		bodyParser: false
	}
};

export default handler;
