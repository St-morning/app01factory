import { ReactNode, useEffect, useState } from 'react';
import { Upload } from '@arco-design/web-react';
import { UploadItem, UploadListProps } from '@arco-design/web-react/es/Upload';
import { File as FdFile, Result } from '../../pages/api/file/upload.api';
import api from '../../atoms/api';
import deletefile from '../../pages/api/file/delete/deletefile';
import getfile from '../../atoms/getfile';

export type FunRenderFileItem = (name: string, fileid: string, onRemove: () => void) => JSX.Element;

/**
 * 文件上传
 */
export default function Uploader({
	listType,
	disabled,
	limit,
	deleteFileOnServer = false,
	multiple = false,
	files,
	defaultFiles = [],
	onChange,
	onError,
	onAdd,
	renderUploadItem,
	renderUploadList,
	onCheck = () => true,
	children,
	accept,
	tip,
	drag = false,
	directory,
	action = api['/api/file/upload']
}: {
	/**
	 * 展示类型
	 * @defaultValue text
	 */
	listType?: 'text' | 'picture-list' | 'picture-card';
	/**
	 * 是否禁用
	 */
	disabled?: boolean;
	/**
	* @zh 是否拖拽上传
	* @en Whether to enable drag and drop upload
	*/
	drag?: boolean
	/**
	 * @zh 提示文字，listType 不同，展示会有区别
	 * @en The tip text
	 */
	tip?: string;
	/**
	 * @zh 接受上传的类型 [详细请参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
	 * @en Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
	 */
	accept?: string;
	/**
	 * 允许上传多个文件时限制最多可上传文件数量
	 */
	limit?: number | {
		maxCount: number;
		hideOnExceedLimit?: boolean;
	};
	/**
	 * 点击删除按钮时，在服务器上删除该文件
	 */
	deleteFileOnServer: boolean;
	/**
	 * 是否允许上传多个文件
	 */
	multiple: boolean;
	/**
	 * 默认展示的文件列表
	 */
	defaultFiles?: FdFile[];
	/**
	 * 受控模式
	 */
	files?: FdFile[];
	/**
	 * 文件夹上传
	 */
	directory?: boolean;
	/**
	 * Uploading URL
	 */
	action?: string;
	/**
	 * 文件列表有改变时触发
	 * @param files 文件列表
	 */
	onChange?(files: FdFile[]): void;
	/**
	 * 上传错误
	 */
	onError?(msg: string, name: string, type: string): void;
	/**
	 * 文件列表新增文件
	 * @param file 上传的文件
	 */
	onAdd?(file: FdFile): void;
	/**
	 * 自定义上传列表项
	 */
	renderUploadItem?: (originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode;
	/**
	 * 自定义展示上传文件列表
	 */
	renderUploadList?: (fileList: UploadItem[], uploadListProps: UploadListProps) => ReactNode;
	onCheck?(file: File, filesList: File[]): boolean | Promise<any>;
	children?: ReactNode;
}) {
	const [filelist, setfilelist] = useState(defaultFiles.map((file) => {
		return {
			uid: file.fileid,
			name: file.filename,
			response: {
				fileid: file.fileid,
				filename: file.filename
			},
			status: 'done',
			url: getfile(file.fileid)
		} as UploadItem;
	}));
	useEffect(() => {
		if (files) {
			setfilelist(files.map((file) => {
				return {
					uid: file.fileid,
					name: file.filename,
					response: {
						fileid: file.fileid,
						filename: file.filename
					},
					status: 'done',
					url: getfile(file.fileid)
				} as UploadItem;
			}));
		}
	}, [files]);
	return <>
		<Upload
			directory={directory}
			disabled={disabled}
			drag={drag}
			tip={tip}
			limit={limit}
			multiple={multiple}
			fileList={filelist}
			action={action}
			accept={accept}
			listType={listType}
			imagePreview
			renderUploadItem={renderUploadItem}
			renderUploadList={renderUploadList}
			onChange={(files, file) => {
				const filesAllUploaded = files.every((file) => {
					return file.status === 'done' || file.status === 'init';
				});
				if (file.status === 'done') {
					if (onAdd) {
						const res = file.response as Result;
						onAdd({
							fileid: res.fileid,
							filename: res.filename
						});
					}
					filesAllUploaded && onChange && onChange(files.filter((file) => {
						return file.status === 'done';
					}).map((file) => {
						const res = file.response as Result;
						return {
							fileid: res.fileid,
							filename: res.filename
						};
					}));
				} else if (file.status === 'error') {
					onError && onError(file.response as unknown as string, file.name, file.originFile?.type);
				}
				setfilelist(files);
			}}
			beforeUpload={(file, files) => {
				return onCheck(file, files);
				// 全部图片类型;
				// if (/image/.test(file.type)) {
				// 	return true;
				// }
				// 只是jpg
				// if (/image\/(jpeg|jpg)/.test(file.type)) {
				// 	return true;
				// }
				// 视频文件
				// if (/video/.test(file.type)) {
				// 	return true;
				// }
				// 压缩文件
				// if (/application\/(x-7z-compressed|x-gzip|zip|x-rar)/.test(file.type)) {
				// 	return true;
				// }
				// Word
				// if (/application\/(vnd\.openxmlformats-officedocument\.wordprocessingml\.document|wps-office\.docx)/.test(file.type)) {
				// 	return true;
				// }
				// Excel
				// if (/application\/(vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|wps-office\.xlsx)/.test(file.type)) {
				// 	return true;
				// }
				// Ppt
				// if (/application\/(vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|wps-office\.pptx)/.test(file.type)) {
				// 	return true;
				// }
				// Pdf
				// if (/application\/pdf/.test(file.type)) {
				// 	return true;
				// }
				// Message.error('不支持的文件类型');
				// return false;
			}}
			onRemove={async (file) => {
				if (deleteFileOnServer) {
					const res = file.response as Result;
					if (!/\//.test(res.fileid)) {
						await deletefile({
							id: res.fileid
						});
					}
				}
			}}
		>{children}</Upload>
	</>;
}
