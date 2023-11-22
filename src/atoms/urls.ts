
const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';

export default {
	basePath,
	isLocal(url: string) {
		return this.parsePath(url, false).pathname.indexOf(basePath) === 0;
	},
	parsePath(path: string, withBase = true) {
		if (withBase) {
			path = path.replace(new RegExp(`^${basePath}`), '');
		}
		const hashIndex = path.indexOf('#');
		const queryIndex = path.indexOf('?');
		const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);

		if (hasQuery || hashIndex > -1) {
			return {
				pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
				query: hasQuery
					? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined)
					: '',
				hash: hashIndex > -1 ? path.slice(hashIndex) : '',
			};
		}

		return { pathname: path, query: '', hash: '' };
	}
};
