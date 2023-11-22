import api from '../../../atoms/api';
import smartfetch from '../../../atoms/smart-fetch';
import { Message, Result } from './reset-psw.api';

export type { Data as Result, Message } from './reset-psw.api';

export default async function apiAccountResetPsw(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/reset-psw'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
