import getFirstDayOfMonth from './get-first-day-of-month';
import getlastDayOfMonth from './get-last-day-of-month';
import toDate from './to-date';

export default function getDaysOfMonth(cur: any) {
	const dtDayFirst = getFirstDayOfMonth(cur);
	const dtDayLast = getlastDayOfMonth(cur);
	const dts = [] as Date[];	// 全部日期数据
	for (let dtTemp = dtDayFirst.getTime(); dtTemp <= dtDayLast.getTime(); dtTemp += 1000 * 60 * 60 * 24) {
		dts.push(toDate(dtTemp));
	}
	return dts;
}
