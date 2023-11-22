import { PageConfig } from 'next';
import baseSysGet from '../base/get';
import key from './key';

/**
 * 获取门户小图片
 */
const handler = baseSysGet(key());

export const config: PageConfig = {};

export default handler;
