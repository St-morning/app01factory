import moment from 'moment';

/**
 * 获取某天的开始时间
 * @param time 时间戳
 */
export default function getBeginOfDay(time: number | string, format?: string) {
	return moment(time, format).startOf('day').valueOf();
}
