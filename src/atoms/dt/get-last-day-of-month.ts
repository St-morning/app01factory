import getEndOfMonth from './get-end-of-month';
import toDate from './to-date';

/**
 * 获取日历上显示的当月最后一天，实际日期不一定是该月最后一天，也可能是下个月的前6天的某一天
 */
export default function getlastDayOfMonth(cur: any) {
	const dtDay32 = toDate(getEndOfMonth(cur));
	// 周日移到上一周的最后一天，即当前周+7-1,因为需要最后的值为正整数，所以再加7天，最后再对7取余,再使用7减去当前的星期就是相关的天数
	const dayDiff = 6 - (dtDay32.getDay() + 6) % 7;	// 7 - ((1,2,3,4,5,6,0) + (7 - 1)) = 7 - (0,1,2,3,4,5,6) = (7,6,5,4,3,2,1)
	const dtDayEnd = new Date(dtDay32);
	dtDayEnd.setDate(dtDay32.getDate() + dayDiff);
	return dtDayEnd;
}
