import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './enable.api';

export type { Data as Result, Message } from './enable.api';

export default async function apiAdminUserEnable(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/user/enable'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
