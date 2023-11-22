export default function isTimestamp(val: any) {
	return typeof val === 'string' && /^[-+]?\d+$/.test(val);
}
