import mmLogger from '../atoms/server/logger';

const logger = mmLogger('/schedule/device-is-online');

type IData = {
};

/**
 * 定时任务模板
 */
export default async function sms(data: IData) {
	logger.info('执行定时任务开始');
	try {
		await Promise.resolve();
	} catch (error) {
		logger.error(error);
	}
	logger.info('执行定时任务结束');
}
