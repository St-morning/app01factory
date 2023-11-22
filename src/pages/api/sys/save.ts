import api from '../../../atoms/api';
import smartfetch from '../../../atoms/smart-fetch';
import { Message, Result } from './save.api';

export type { Data, Message, Result } from './save.api';

export default async function apiSysSave(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/sys/save'], 'put', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
