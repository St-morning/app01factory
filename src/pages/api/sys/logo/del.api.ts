import { PageConfig } from 'next';
import baseSysDel from '../base/del';
import key from './key';

/**
 * 删除logo
 */
const handler = baseSysDel(key());

export const config: PageConfig = {};

export default handler;
