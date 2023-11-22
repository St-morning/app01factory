import { PageConfig } from 'next';
import baseSysGet from '../base/get';
import key from './key';

/**
 * 获取系统登录logo左侧大图片
 */
const handler = baseSysGet(key());

export const config: PageConfig = {};

export default handler;
