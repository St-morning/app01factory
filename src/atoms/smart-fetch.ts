
export default async function smartfetch<R, M = unknown>(service: string, method: 'get' | 'put' | 'post' | 'delete', msg?: M) {
	const { url, body } = (() => {
		if (method === 'get') {
			const [base, search] = service.split('?');
			const sp = new URLSearchParams(search);
			if (msg && typeof msg === 'object') {
				Object.keys(msg).forEach((key) => {
					sp.append(key, (msg as unknown as Record<string, string>)[key] || '');
				});
			}
			const s = sp.toString();
			if (s.length > 0) {
				return {
					url: `${base}?${s}`,
					body: undefined
				};
			}
			return {
				url: service,
				body: undefined
			};
		}
		return {
			url: service,
			body: JSON.stringify(msg)
		};
	})();
	const res = await fetch(url, {
		method,
		body,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
	if (res.ok) {
		const data = await res.json() as R;
		return data;
	}
	throw new Error(decodeURIComponent(res.statusText));
}
