import { NextRequest, NextResponse } from 'next/server';
import pages from './atoms/pages';

// https://nextjs.org/docs/advanced-features/middleware
export function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const pathname = url.pathname;
	if (/^\/admin/.test(pathname) && pathname !== pages['/account/signin']) {
		const t = req.cookies.get(process.env.NEXT_SESSION_TOKEN);
		if (!t) {
			const basePath = url.basePath || '';
			const redirect = url.search ? pathname + url.search : pathname;
			return NextResponse.redirect(new URL(`${basePath + pages['/account/signin']}?redirect=${encodeURI(redirect)}`, req.url), {
				nextConfig: {
					// basePath: basePath	// todo NextResponse.redirect would not add basePath
				}
			});
		}
	}
	// if (/^\/h5/.test(pathname) && pathname !== pages['/h5/sigin']) {
	// 	const t = req.cookies.get(process.env.NEXT_SESSION_TOKEN);
	// 	if (!t) {
	// 		const basePath = url.basePath || '';
	// 		const redirect = url.search ? pathname + url.search : pathname;
	// 		return NextResponse.redirect(new URL(`${basePath + pages['/h5/sigin']}?redirect=${encodeURI(redirect)}`, req.url), {
	// 			nextConfig: {
	// 				// basePath: basePath	// todo NextResponse.redirect would not add basePath
	// 			}
	// 		});
	// 	}
	// }
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
// 	matcher: ['/((?!api|static|favicon.ico).*)']
// 	// matcher: ['/((?!api|static|favicon.ico).*)']
// };
