import SysKeyType from '../../../../db/01factory/type/sys-key';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/sys/base/get.api');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export default function baseSysGet(key: SysKeyType) {
	const handler = createHandler<Result>();

	return handler.get(async (_req, res) => {
		logger.debug('get config', key);
		const url = await ctrls.sysConfig.getImg(key);
		res.redirect(url);
	});
}
