import { PageConfig } from 'next';
import baseSysPut from '../base/put';
import key from './key';

/**
 * 保存系统登录logo左侧大图片
 */
const handler = baseSysPut(key());

export const config: PageConfig = {};

export default handler;
