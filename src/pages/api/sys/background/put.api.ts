import { PageConfig } from 'next';
import baseSysPut from '../base/put';
import key from './key';

/**
 * 保存现场评审背景图片
 */
const handler = baseSysPut(key());

export const config: PageConfig = {};

export default handler;
