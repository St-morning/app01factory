import { UploadItem, UploadListProps } from '@arco-design/web-react/es/Upload';
import { Progress, Tooltip } from '@arco-design/web-react';
import { IconDelete, IconDownload, IconEye, IconPause, IconPlayArrowFill, IconUpload } from '@arco-design/web-react/icon';
import { File as FdFile, Result } from '../../pages/api/file/upload.api';
import api from '../../atoms/api';

export type UploadFile = FdFile & {
	previewUrl: string;
	downloadUrl: string;
};

export default function renderUploadList(files: UploadItem[], props: UploadListProps) {
	const uploaded = files.filter((file) => {
		return file.status === 'done';
	}).map((file) => {
		const f = file.response as Result;
		const fileid = f.fileid;
		const previewUrl = `${api['/api/file/preview/id']}/${fileid}`;
		const downloadUrl = `${api['/api/file/id']}/${fileid}`;
		return {
			...f,
			previewUrl,
			downloadUrl
		};
	});
	const notUploaded = files.filter((file) => {
		return file.status !== 'done';
	});
	return <div>
		<UploadedFileList files={uploaded} onRemove={(file) => {
			const f = files.find((it) => {
				const r = it.response as Result;
				return r.fileid === file.fileid;
			});
			if (f) {
				props.onRemove(f);
			}
		}
		} />
		< UnUploadedFileList files={notUploaded} props={props} />
	</div>;
}

function UploadedFileList({
	files,
	onRemove
}: {
	// 全部已上传文件列表
	files: UploadFile[];
	// 自定义组件中删除已上传文件时要触发该事件
	onRemove: (file: UploadFile) => void;
}) {
	return <div>
		{files.map((file) => {
			const fileid = file.fileid;
			return <FileCardDone
				previewUrl={file.previewUrl}
				downloadUrl={file.downloadUrl}
				key={file.fileid}
				name={file.filename}
				fileid={file.fileid}
				onRemove={() => {
					onRemove(file);
				}}
			/>;
		})}
	</div>;
}

/**
 * 未上传文件列表
 */
function UnUploadedFileList({
	files,
	props
}: {
	files: UploadItem[];
	props: UploadListProps;
}) {
	return <div>
		{files.map((file) => {
			return <FileCard key={file.uid} file={file} props={props} />;
		})}
	</div>;
}

function FileCard({
	file,
	props
}: {
	file: UploadItem;
	props: UploadListProps;
}) {
	const { status, percent } = file;
	const { progressProps } = props;
	if (status === 'error') {
		return <FileCardError
			errMsg={file.response as unknown as string}
			onClick={() => {
				props.onReupload(file);
			}}
		/>;
	}
	if (status === 'done') {
		const f = file.response as Result;
		const fileid = f.fileid;
		const previewUrl = `${api['/api/file/preview/id']}/${fileid}`;
		const downloadUrl = `${api['/api/file/id']}/${fileid}`;
		return <FileCardDone
			previewUrl={previewUrl}
			downloadUrl={downloadUrl}
			name={f.filename}
			fileid={f.fileid}
			onRemove={() => {
				props.onRemove(file);
			}}
		/>;
	}
	// if (!f) {
	// 	return <><Spin dot /></>;
	// }
	// if (!f || file.status !== 'done') {
	// 	return <><Spin dot /></>;
	// }
	return <div>
		<Progress
			showText={false}
			type="line"
			status='normal'
			percent={percent}
			size="large"
			{...progressProps}
		/>
		{status === 'init' && (
			<FileCardInit
				onClick={() => {
					props.onUpload && props.onUpload(file);
				}}
			/>
		)}

		{status === 'uploading' && (
			<FileCardUploading
				onClick={() => {
					props.onAbort && props.onAbort(file);
				}}
			/>
		)}
	</div>;
}

function FileCardUploading({
	onClick
}: {
	onClick(): void;
}) {
	return <span
		onClick={onClick}
	>
		<Tooltip content='取消'>
			<IconPause />
		</Tooltip>
	</span>;
}

function FileCardInit({
	onClick
}: {
	onClick(): void;
}) {
	return <span
		onClick={onClick}
	>
		<Tooltip content='开始上传'>
			<IconPlayArrowFill />
		</Tooltip>
	</span>;
}

function FileCardError({
	errMsg,
	onClick
}: {
	errMsg: string;
	onClick(): void;
}) {
	return <div className='ec' onClick={onClick}>
		<div className='reload'>
			<span>Error: </span>
			<span>{errMsg} </span>
		</div>
		<div className='reupload'>
			<span className='txt'>
				重新上传
			</span>
			<IconUpload />
		</div>
		<style jsx>{`
.reload{
width: 50%;
}
.ec{
color: #f00;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 2rem;
width:60%;
}
.reupload{
cursor: pointer;
}
.txt{
	padding: 0 1rem;
}
`}</style>
	</div>;
}

function FileCardDone({
	name,
	fileid,
	previewUrl,
	downloadUrl,
	onRemove
}: {
	name: string;
	fileid: string;
	previewUrl: string;
	downloadUrl: string;
	onRemove: () => void;
}) {
	return <div className='item'>
		<a style={{ textDecoration: 'none' }} target={'_blank'} rel="noreferrer" href={previewUrl}>
			<div>
				{name}
			</div>
		</a>
		<div className='btns'>
			<div className='btn'>
				<a target={'_blank'} rel="noreferrer" href={previewUrl}>
					<IconEye fontSize={'1.5rem'} />
				</a>
			</div>
			<div className='btn'>
				<a download rel="noreferrer" href={downloadUrl}>
					<IconDownload fontSize={'1.4rem'} />
				</a>
			</div>
			<div className="btn">
				<IconDelete
					onClick={onRemove} fontSize={'1.5rem'}
				/>
			</div>
		</div>
		<style jsx>{`
.btn{
padding: 0.5rem;
cursor: pointer;
}
.btns{
display: flex;
flex-direction: row;
}
.item{
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: .625rem;
}
`}</style>
	</div>;
}
