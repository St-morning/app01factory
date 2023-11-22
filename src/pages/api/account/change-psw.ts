import api from '../../../atoms/api';
import smartfetch from '../../../atoms/smart-fetch';
import { Message, Result } from './change-psw.api';

export type { Data as Result, Message } from './change-psw.api';

export default async function apiAccountChangePsw(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/change-psw'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
