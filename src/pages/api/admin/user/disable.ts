import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './disable.api';

export type { Data as Result, Message } from './disable.api';

export default async function apiAdminUserDisable(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/user/disable'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
