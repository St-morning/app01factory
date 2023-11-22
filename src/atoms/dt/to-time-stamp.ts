import isTimestamp from './is-timestamp';

export default function dt2timeStamp(date: any) {
	if (!date) {
		return 0;
	}
	if (isTimestamp(date)) {
		return parseInt(date, 10);
	}
	return new Date(date).getTime();
}
