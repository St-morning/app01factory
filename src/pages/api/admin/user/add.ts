import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './add.api';

export type { Data as Result, Message } from './add.api';

export default async function apiAdminUserAdd(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/user/add'], 'put', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
