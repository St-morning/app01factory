import { PageConfig } from 'next';
import SysKeyType from '../../../db/01factory/type/sys-key';
import tb01sys from '../../../db/01factory/table/tb01sys';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/sys/save.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = Record<SysKeyType, string>;

/**
 * 保存系统设置
 */
const handler = createHandler<Result>();

handler.put(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;

		await tb01sys().transaction(async (trx) => {
			const tb = tb01sys().useTransaction(trx);
			const old = await tb.query();
			const keys = old.reduce((pre, cur) => {
				return pre.add(cur.key as SysKeyType);
			}, new Set<SysKeyType>());

			await Object.keys(msg).reduce(async (pre, it) => {
				await pre;
				const key = it as SysKeyType;
				const value = msg[key];
				if (value) {
					if (keys.has(key)) {
						await tb.update({
							value
						}, {
							key
						});
					} else {
						await tb.insert({
							key,
							value
						});
					}
				}
			}, Promise.resolve());
		});
		res.status(200).json({
			ok: true,
			data: {}
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
