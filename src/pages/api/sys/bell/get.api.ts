import { PageConfig } from 'next';
import baseSysGet from '../base/get';
import key from './key';

/**
 * 获取打分铃音
 */
const handler = baseSysGet(key());

export const config: PageConfig = {};

export default handler;
