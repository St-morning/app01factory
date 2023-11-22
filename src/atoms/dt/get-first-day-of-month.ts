import getBeginOfMonth from './get-begin-of-month';
import toDate from './to-date';

/**
 * 获取日历上显示的当月第一天，实际日期不一定是该月1号，也可能是上个月的最后6天的某一天
 */
export default function getFirstDayOfMonth(cur: any) {
	const dtDay1 = toDate(getBeginOfMonth(cur));
	// 周日移到上一周的最后一天，即当前周-1,因为需要最后的值为正整数，所以再加7天，最后再对7取余
	const dayDiff = (dtDay1.getDay() + 6) % 7;	// (1,2,3,4,5,6,0) + (7 - 1) = (7,8,9,10,11,12,6) % 7 = (0,1,2,3,4,5,6)
	const dtDayFirst = new Date(dtDay1);
	dtDayFirst.setDate(dtDay1.getDate() - dayDiff);
	return dtDayFirst;
}
