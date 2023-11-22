import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';
import { SysTbimpexpExpParam } from '../controllers/sys/tbimpexp';

const logger = mmLogger('pages/api/file/exp-data.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = Pick<SysTbimpexpExpParam, 'tableAlias' | 'tableName'>;

/**
 * 导出表数据
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;

		await ctrls.sysTbimpexp.exp({
			tableAlias: msg.tableAlias,
			tableName: msg.tableName,
			sendStream(stream) {
				stream.pipe(res);
				return Promise.resolve();
			},
			setHeader(name, value) {
				res.setHeader(name, value);
				return Promise.resolve();
			},
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
