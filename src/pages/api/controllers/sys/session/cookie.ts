import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/sys/session/cookie');

const { sign, verify } = jsonwebtoken;

export type CallBackSetCookie = (name: string, value: string) => void;
export type CallBackGetCookie = (name: string) => string | undefined;
export type CallBackDelCookie = (name: string) => void;

const sysSessionCookie = {
	set<T extends {}>(setCookie: CallBackSetCookie, name: string, value: T) {
		const opt = this._getOptions();
		// Cookie加密
		const val = sign(value, opt.secret, { expiresIn: opt.expiresIn, algorithm: 'HS256' });
		setCookie(name, val);
	},
	del(delCookie: CallBackDelCookie, name: string) {
		return delCookie(name);
	},
	get<T>(getCookie: CallBackGetCookie, name: string) {
		const opt = this._getOptions();
		const token = getCookie(name)!;
		return new Promise<T>((res, rej) => {
			verify(token, opt.secret, {
				algorithms: ['HS256'],
				complete: false
			}, (err, decoded) => {
				if (err) {
					logger.error('failed verify token:', token, 'resion:', err.message);
					res({} as T);
				}
				const { exp, iat, ...rest } = decoded as JwtPayload;
				logger.debug('sccess verify token:', token, 'exp:', exp, 'iat:', iat, 'userinfo:', rest);
				// delete decoded.exp;iat
				res(rest as T); // todo we don't need as unknown here, just ignore ts error, this maybe an issue of typescript.
			});
		});
	},
	_getOptions() {
		const secret = process.env.SESSION_SECRET!;
		const expiresIn = process.env.SESSION_EXPIRESIN!;
		return {
			secret,
			expiresIn
		};
	},
};
export default sysSessionCookie;
