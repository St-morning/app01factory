import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './jchzhhm.api';

export type { Data as Result, Message } from './jchzhhm.api';

/**
 * 检查帐号名
 */
export default async function apiAccountSiginupJchzhhm(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/siginup/jchzhhm'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
