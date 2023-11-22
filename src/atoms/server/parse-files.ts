import { Form } from 'multiparty';
import { NextApiRequest } from 'next';
import { SysFileParseFilesResult } from '../../pages/api/controllers/sys/file';

/**
 * 解析文件
 */
export default function parseFiles<T = Record<string, string[]>>(req: NextApiRequest) {
	type ParsedFiles = Record<
		string,
		[
			{
				fieldName: string;
				path: string;
				originalFilename: string;
				headers: Record<string, string>;
				size: number;
			}
		]
	>;
	return new Promise<SysFileParseFilesResult<T>[]>((res, rej) => {
		const form = new Form({
			// maxFilesSize: this.getMaxFileSize(),
		});
		form.parse(req, (err, fields: T, files: ParsedFiles) => {
			if (err) {
				rej(err);
			} else {
				res(
					Object.keys(files).map((name) => {
						const [file] = files[name];
						return {
							fields,
							name: file.originalFilename || file.fieldName,
							path: file.path,
							type: file.headers['content-type'] || 'application/octet-stream',
						};
					})
				);
			}
		});
	});
}
