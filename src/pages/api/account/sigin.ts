import api from '../../../atoms/api';
import smartfetch from '../../../atoms/smart-fetch';
import { Message, Result } from './sigin.api';

export type { Data as Result, Message } from './sigin.api';

export default async function apiAccountsigin(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/sigin'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
