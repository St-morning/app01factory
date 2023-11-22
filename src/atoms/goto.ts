import { UrlObject } from 'url';
import Router from 'next/router';

type Url = UrlObject | string;
type TransitionOptions = {
	shallow?: boolean;
	locale?: string | false;
	scroll?: boolean;
	unstable_skipClientCache?: boolean;
};

/**
 * 页面跳转
 */
export default function goto(url: Url, as?: Url, options?: TransitionOptions) {
	return Router.push(url, as, options);
}
