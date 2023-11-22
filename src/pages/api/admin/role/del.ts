import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './del.api';

export type { Data as Result, Message } from './del.api';

export default async function apiAdminRoleDel(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/del'], 'delete', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
