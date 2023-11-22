import { PageConfig } from 'next';
import baseSysPut from '../base/put';
import key from './key';

/**
 * 保存门户小图片
 */
const handler = baseSysPut(key());

export const config: PageConfig = {};

export default handler;
