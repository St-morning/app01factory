import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './getuser.api';

export type { Data as Result, Message } from './getuser.api';

export default async function apiAdminUserGetuser(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/user/getuser'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
