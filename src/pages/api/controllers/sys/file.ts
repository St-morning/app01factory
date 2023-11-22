import { basename, extname, join } from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { Readable } from 'node:stream';
import { Client, ItemBucketMetadata } from 'minio';
import range_parser from 'range-parser';
import api from '../../../../atoms/api';
import uuid from '../../../../atoms/server/uuid';
import qrcode from '../../../../atoms/server/qrcode';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/file');

export type SysFileUploadParam = {
	type: string;
	filename: string;
	fileData: Buffer;
};
export type SysFileDownloadParam = {
	id: string;
	download?: string | boolean;
	getHeader(name: string): string | undefined;
	setHeader(name: string, value: string | number): void;
	setStatus(status: number): void;
	sendStream(stream: Readable): Promise<void>;
};
export type SysFilePreviewParam = {
	id: string;
	getHeader(name: string): string | undefined;
};

export type SysFileParseFilesResult<T = Record<string, string[]>> = {
	name: string;
	path: string;
	type: string;
	fields: T;
};

export type SysFileHqwjdxxzResult = number;

export type BaseDownloadParam = {
	id: string;
	encrypt: boolean;
};
export type BaseDownloadResult = string;

export type SysFileShchewmParam = {
	text: string;
};
export type SysFileShchewmResult = string;

export type SysFileRemoveParam = string;
export type SysFileRemoveResult = {};

export type SysFileReplaceResult = SysFileBcwjdwjkResult<{
	fields: Record<string, string[]>;
	'content-type': string;
	originialfilename: string;
}, Record<string, string[]>>;

// export type SysFileScspwjParam = {
// 	req: NextApiRequest;
// 	screenshottime: number;
// };
// export type SysFileScspwjResult = {};

interface IFile<M = Record<string, unknown>, N = Record<string, string[]>> extends SysFileParseFilesResult<N> {
	id?: string;
	meta?: M;
}
export type SysFileBcwjdwjkParam<M = Record<string, unknown>, N = Record<string, string[]>> = {
	files: IFile<M, N>[];
	encrypt: boolean;
};
export type SysFileBcwjdwjkResult<M, N> = {
	id: string;
	contentType: string;
	name: string;
	md5: string;
	meta: M;
	fields: N;
};
let gClient = null as unknown as Client;

const sysFile = {
	/**
	 * 保存文件到文件库
	 */
	async upload(files: IFile[]) {
		// 解析并保存文件
		logger.debug('start uploading files');
		const encrypt = false;
		logger.debug('files:', files);
		const uploaded = await this.saveFile2minio({
			files: files.map((it) => {
				return {
					...it,
					meta: {}
				};
			}),
			encrypt
		});
		logger.info('upload all!');
		const [file] = uploaded;
		logger.debug('upload file', file);
		return file;
	},
	/**
	 * 根据文件id下载文件
	 */
	async download({ id, download, getHeader, setHeader, setStatus, sendStream }: SysFileDownloadParam) {
		const encrypt = false;
		if (!id) {
			logger.debug('method: getfile,id is empty');
			throw new Error('id can not be empty!');
		}
		const none_match = getHeader('if-none-match');
		logger.debug(`method: getfile,file_id:${id}`);
		const client = await this.getClient();
		const itemStat = await client.stat(id);
		// Etag标识
		const etag = `W/"${itemStat.etag}"`;
		setHeader('Etag', etag);
		// 增加Etag判断文件是否有变动
		if (none_match && none_match === etag) {
			// 文件没有变动直接返回304使用本地缓存
			// res.removeHeader('Content-Type');
			// res.removeHeader('Content-Length');
			// res.removeHeader('Transfer-Encoding');
			// res.statusCode = 304;
			// res.end();
			setStatus(304);
			return;
		}
		setStatus(200);

		type IMetaData = {
			originialfilename: string;
			'content-type': string;
		};
		const meta = itemStat.metaData as IMetaData;
		setHeader('Content-Type', meta['content-type']);
		const filename = meta.originialfilename;
		if (download !== undefined && download !== false && download !== 'false') {
			// 强制下载文件
			logger.debug(`method: getfile,download: true,file_name:${filename}`);
			if (download === true || download === 'true') {
				setHeader('Content-Disposition', `attachment; filename=${filename}`);
			} else {
				// rename, `download` should be a filename
				setHeader('Content-Disposition', `attachment; filename=${download}`);
			}
		} else {
			setHeader('Content-Disposition', `inline; filename=${filename}`);
		}
		const r = getHeader('range');
		if (r) {
			logger.info(`method: getfile,id:${id} with range:${r}`);
			const ranges = range_parser(itemStat.size, r, { combine: true });
			logger.debug(`parsed range:${JSON.stringify(ranges)}`);
			if (ranges === -1) {
				if (encrypt) {
					const filepath = await client.get(id);
					const buf = await fs.readFile(filepath);
					await fs.writeFile(filepath, this.decrypt(buf));
					const s = await fs.stat(filepath);
					await fs.rm(filepath);
					setHeader('Content-Range', `*/${s.size}`);
				} else {
					setHeader('Content-Range', `*/${itemStat.size}`);
				}
				throw new Error('Incorrect request!');
			} else if (ranges === -2) {
				throw new Error('Incorrect request!');
			} else {
				if (encrypt) {
					throw new Error('Incorrect request!');
				}
				const range = ranges[0];
				const start = range.start;
				const end = range.end; // for lastest byte
				setStatus(206);
				// res.statusCode = 206;
				setHeader('Content-Range', `bytes ${start}-${end}/${itemStat.size}`);
				setHeader('Content-Length', end + 1 - start);
				const stream = await client.getPartial(
					id,
					start,
					end
				);
				await sendStream(stream);
			}
		} else {
			logger.debug(`method: getfile,id:${id} without range.`);
			if (encrypt) {
				const filepath = await client.get(id);
				const buf = await fs.readFile(filepath);
				await fs.writeFile(filepath, this.decrypt(buf));
				const stream = createReadStream(filepath);
				stream.on('close', async () => {
					await fs.rm(filepath);
				});
				await sendStream(stream);
			} else {
				const stream = await client.getStream(id);
				await sendStream(stream);
			}
		}
	},
	/**
	 * 预览文件
	 */
	preview({ id, getHeader }: SysFilePreviewParam) {
		const uri = `${getHeader('scheme')}://${getHeader('host')}${api['/api/file/id']}/${id}`;
		logger.info('preview', uri);
		return `/preview/onlinePreview?url=${encodeURIComponent(base64encode(uri))}&watermarkTxt=${encodeURIComponent('01微工厂')}`;
	},

	/**
	 * 获取文件大小限制
	 */
	getMaxFileSize() {
		return parseInt(process.env.MAX_FILE_SIZE!, 10) as SysFileHqwjdxxzResult;
	},
	/**
	 * 保存文件到文件库
	 */
	async saveFile2minio<N = Record<string, string[]>>(param: SysFileBcwjdwjkParam) {
		logger.debug(param);
		const { encrypt, files } = param;
		const client = await this.getClient();
		return Promise.all(files.map(async (file) => {
			const meta = {
				...file.meta,
				fields: file.fields,
				'content-type': file.type,
				originialfilename: encodeURIComponent(file.name),
			};
			if (file.id) {
				try {
					await client.remove(file.id);
				} catch {
					// file may not exist. ignore
				}
			}
			if (file.path) {
				const id = (() => {
					if (file.id) {
						return file.id;
					}
					if (file.fields) {
						const id = (file.fields as unknown as {
							id: string;
						}).id;
						if (id && typeof id === 'string') {
							return id;
						}
					}
					const ext = extname(file.name);
					if (ext) {
						return `${uuid()}${ext}`;
					}
					const id = uuid();
					// 文件名中无后缀名
					switch (file.type) {
						case 'text/plain':
							return `${id}.txt`;
						case 'text/html':
							return `${id}.html`;
						case 'image/jpeg':
							return `${id}.jpeg`;
						case 'image/png':
							return `${id}.png`;
						case 'audio/wave':
						case 'audio/wav':
						case 'audio/x-wav':
						case 'audio/x-pn-wav':
							return `${id}.wav`;
						case 'audio/mpeg':
							return `${id}.mp3`;
						case 'audio/ogg':
							return `${id}.ogg`;
						case 'video/mp4':
							return `${id}.mp4`;
						case 'video/ogg':
						case 'application/ogg':
							return `${id}.ogg`;
						case 'application/json':
							return `${id}.json`;
						case 'application/javascript':
							return `${id}.js`;
						case 'application/ecmascript':
							return `${id}.js`;
						case 'image/gif':
							return `${id}.gif`;
						case 'image/svg+xml':
							return `${id}.svg`;
						case 'application/x-7z-compressed':
							return `${id}.7z`;
						case 'application/x-gzip':
							return `${id}.gz`;
						case 'application/zip':
							return `${id}.zip`;
						case 'application/x-rar':
							return `${id}.rar`;
						case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
							return `${id}.odt`;
						case 'application/msword':
							return `${id}.doc`;
						case 'application/wps-office.docx':
							return `${id}.docx`;
						case 'application/vnd.ms-excel':
							return `${id}.xls`;
						case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
							return `${id}.ods`;
						case 'application/wps-office.xlsx':
							return `${id}.xlsx`;
						case 'application/vnd.ms-powerpoint':
							return `${id}.ppt`;
						case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
							return `${id}.odp`;
						case 'application/wps-office.pptx':
							return `${id}.pptx`;
						case 'application/pdf':
							return `${id}.pdf`;
						case 'audio/*':
						case 'application/*':
						case 'application/octet-stream':
						default:
							return id;
					}
				})();
				if (encrypt) {
					const buf = await fs.readFile(file.path);
					await fs.writeFile(file.path, this.encrypt(buf));
				}
				const info = await client.fsave(file.path, meta, id);
				const md5 = info.etag;
				const doc = {
					meta,
					contentType: file.type,
					id,
					md5,
					fields: file.fields,
					name: file.name,
				} as SysFileBcwjdwjkResult<typeof meta, N>;
				void fs.unlink(file.path);
				return doc;
			}
			logger.error('Could not read file from file system:');
			throw new Error('Could not read file.');
		}));
	},
	async getClient() {
		const bucketName = process.env.MINIO_NAME_SPACE || 'mmstudio';
		if (!gClient) {
			const config = JSON.parse(process.env.MINIO_CONFIG!);
			gClient = new Client(config);
			if (!(await gClient.bucketExists(bucketName))) {
				await gClient.makeBucket(bucketName, config.region || 'cn-north-1');
			}
		}
		const client = gClient;
		return {
			save(buf: Buffer, meta: ItemBucketMetadata, id = uuid()) {
				return client.putObject(bucketName, id, buf, meta);
			},
			fsave(filePath: string, meta: ItemBucketMetadata, id = uuid()) {
				return client.fPutObject(bucketName, id, filePath, meta);
			},
			async get(id: string) {
				const filepath = join(tmpdir(), id);
				await client.fGetObject(bucketName, id, filepath);
				return filepath;
			},
			remove(id: string) {
				return client.removeObject(bucketName, id);
			},
			removeAll(ids: string[]) {
				return client.removeObjects(bucketName, ids);
			},
			stat(id: string) {
				return client.statObject(bucketName, id);
			},
			getPartial(id: string, start: number, end: number) {
				return client.getPartialObject(
					bucketName,
					id,
					start,
					end - start + 1
				);
			},
			getStream(id: string) {
				return client.getObject(bucketName, id);
			}
		};
	},
	/**
	 * 加密文件
	 */
	encrypt(buf: Buffer) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		return createCipheriv(algorithm, key, iv).update(buf);
	},
	/**
	 * 解密文件
	 */
	decrypt(buf: Buffer) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		return createDecipheriv(algorithm, key, iv).update(buf);
	},
	/**
	 * 文件下载
	 */
	async baseDownload(param: BaseDownloadParam) {
		logger.debug(param);
		const { id, encrypt } = param;
		if (!id) {
			logger.debug('method: getfile,id is empty');
			throw new Error('id can not be empty!');
		}
		logger.debug(`method: getfile,file_id:${id}`);
		const client = await this.getClient();

		logger.debug(`method: getfile,id:${id} without range.`);
		if (encrypt) {
			const filepath = await client.get(id);
			const buf = await fs.readFile(filepath);
			await fs.writeFile(filepath, this.decrypt(buf));
			return filepath;
		}
		const filepath = await client.get(id);
		return filepath;
	},
	/**
	 * 生成二维码
	 */
	async qrcode(param: SysFileShchewmParam) {
		logger.debug(param);
		const { text } = param;
		const client = await this.getClient();
		logger.debug('正在生成二维码', text);
		const buf = await qrcode(text);
		const meta = {
			'content-type': 'image/png',
			originialfilename: 'qrcode.png',
		};
		logger.debug('正在保存二维码', text);
		const id = uuid();
		await client.save(buf, meta, id);
		logger.debug('二维码保存成功', text);
		return id as SysFileShchewmResult;
	},
	/**
	 * 删除文件
	 */
	async remove(...files: SysFileRemoveParam[]) {
		logger.debug('deleting objects:', files);
		try {
			if (files.length > 0) {
				const ids = files.filter((file) => {
					return file;
				}).map((file) => {
					return basename(file);
				});
				if (ids.length === 0) {
					return;
				}
				const client = await this.getClient();
				await client.removeAll(ids);
			}
		} catch (e) {
			// do not throw error even failed remove files
		}
		await Promise.resolve<SysFileRemoveResult>({});
	},
	base64encode,
};
export default sysFile;

function base64encode(input: string) {
	const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	let output = '';
	let i = 0;
	input = utf8_encode(input);
	while (i < input.length) {
		const chr1 = input.charCodeAt(i++);
		const chr2 = input.charCodeAt(i++);
		const chr3 = input.charCodeAt(i++);
		const enc1 = chr1 >> 2;
		const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		let enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	return output;
}

function utf8_encode(input: string) {
	input = input.replace(/\r\n/g, '\n');
	let utftext = '';
	for (let n = 0; n < input.length; n++) {
		const c = input.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}
	return utftext;
}
