import isTimestamp from './is-timestamp';

export default function toDate(date: any) {
	if (!date) {
		return null;
	}
	if (isTimestamp(date)) {
		return new Date(parseInt(date, 10));
	}
	return new Date(date);
}
