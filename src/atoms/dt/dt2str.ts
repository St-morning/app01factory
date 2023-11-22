import toDate from './to-date';

export default function dt2str(tm: any, type: 'date' | 'time' | 'datetime') {
	if (!tm) {
		return '';
	}
	const dt = toDate(tm);
	switch (type) {
		case 'date':
			return dt.toLocaleDateString('zh-CN');
		case 'time':
			return dt.toLocaleTimeString('zh-CN');
		default:
			return dt.toLocaleString('zh-CN');
	}
}

// return moment(time).format(format);
