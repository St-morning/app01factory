import api from './api';
import urls from './urls';

export default function getfile(fileid: string) {
	if (/\//.test(fileid)) {
		// file
		if (fileid.startsWith(urls.basePath)) {
			return fileid;
		}
		// api/getfile/fileid
		if (fileid.startsWith(api['/api/file/id'])) {
			return fileid;
		}
		// /subpath/filename
		if (/^\//.test(fileid)) {
			return urls.basePath + fileid;
		}
		// subpath/filename
		return `${urls.basePath}/${fileid}`;
	}
	return `${api['/api/file/id']}/${fileid}`;
}
