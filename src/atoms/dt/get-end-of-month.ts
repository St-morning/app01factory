import toDate from './to-date';

/**
 * 获取该月最后一天的时间戳
 */
export default function getEndOfMonth(dt: any) {
	const dtEnd = toDate(dt);
	dtEnd.setMonth(dtEnd.getMonth() + 1, 1);
	dtEnd.setHours(0, 0, 0, -1);
	return dtEnd.getTime().toString();
}
