import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './modify.api';

export type { Data as Result, Message } from './modify.api';

export default async function apiAdminGroupModify(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/group/modify'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
