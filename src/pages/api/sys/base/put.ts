import SysKeyType from '../../../../db/01factory/type/sys-key';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/sys/base/put.api');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	value: string;
}

export default function baseSysPut(key: SysKeyType) {
	const handler = createHandler<Result>();

	handler.put(async (req, res) => {
		logger.debug('body', req.body);
		const body = req.body as Message;
		try {
			await ctrls.sysConfig.set(key, body.value);
			res.json({ ok: true });
		} catch (error) {
			logger.trace(error);
			res.json({
				ok: false,
				message: error.toString()
			});
		}
	});
	return handler;
}
