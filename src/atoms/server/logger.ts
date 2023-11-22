import { configure, getLogger } from 'log4js';

configure('./log4js.json');

export default function mmLogger(category: string) {
	return getLogger(category);
}
