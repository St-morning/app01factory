import moment from 'moment';

/**
 * 获取某天的结束时间
 * @param time 时间戳
 */
export default function getEndOfDay(time: number | string, mask?: string) {
	return moment(time, mask).endOf('day').valueOf();
}
