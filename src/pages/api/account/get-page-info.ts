import api from '../../../atoms/api';
import smartfetch from '../../../atoms/smart-fetch';
import { Message, Result } from './get-page-info.api';

export type { Data as Result, Message } from './get-page-info.api';

export default async function apiAccountGetPageInfo(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/get-page-info'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
