import toDate from './to-date';

/**
 * 获取该月第一天的时间戳
 */
export default function getBeginOfMonth(dt: any) {
	const dtBegin = toDate(dt);
	dtBegin.setDate(1);
	dtBegin.setHours(0, 0, 0, 0);
	return dtBegin.getTime().toString();
}
