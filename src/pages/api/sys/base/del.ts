import SysKeyType from '../../../../db/01factory/type/sys-key';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/sys/base/del.api');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
}

export default function baseSysDel(key: SysKeyType) {
	const handler = createHandler<Result>();

	handler.delete(async (req, res) => {
		logger.debug('body', req.body);
		try {
			await ctrls.sysConfig.del(key);
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
