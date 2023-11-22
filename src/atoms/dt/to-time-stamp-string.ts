import isTimestamp from './is-timestamp';

export default function dt2timeStampString(date: any) {
	if (!date) {
		return '';
	}
	if (typeof date === 'number') {
		return parseInt(date.toString(), 10).toString();
	}
	if (isTimestamp(date)) {
		return date as string;
	}
	return new Date(date).getTime().toString();
}
