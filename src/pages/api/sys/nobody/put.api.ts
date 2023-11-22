import { PageConfig } from 'next';
import baseSysPut from '../base/put';
import key from './key';

/**
 * 保存匿名头像
 */
const handler = baseSysPut(key());

export const config: PageConfig = {};

export default handler;
