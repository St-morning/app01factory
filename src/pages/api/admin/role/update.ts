import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './update.api';

export type { Data as Result, Message } from './update.api';

export default async function apiAdminRoleUpdate(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/update'], 'put', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
