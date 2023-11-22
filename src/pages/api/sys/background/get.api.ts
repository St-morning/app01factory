import { PageConfig } from 'next';
import baseSysGet from '../base/get';
import key from './key';

/**
 * 获取背景图片
 */
const handler = baseSysGet(key());

export const config: PageConfig = {};

export default handler;
