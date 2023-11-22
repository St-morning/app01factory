import ctrls from '../../pages/api/ctrls';

export default function getUser(req: {
	cookies: Partial<{
		[key: string]: string;
	}>;
}) {
	return ctrls.sysSession.getUser((name) => {
		return req.cookies[name];
	});
}
