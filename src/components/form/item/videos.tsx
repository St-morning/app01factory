import getfile from '../../../atoms/getfile';
import res from '../../../atoms/res';
import { File } from '../../../pages/api/file/upload.api';
import Uploader from '../../file/uploader';
import FormItem, { IFormItemProps } from '../item';

/**
 * 图像
 */
export default function FormItemVideos({
	fileids,
	width = '5rem',
	height = '5rem',
	onChange,
	...itemProps
}: {
	fileids: string[];
	width?: string;
	height?: string;
	onChange(fids: string[]): void
} & IFormItemProps) {
	const filelist = fileids.map((fileid) => {
		return { fileid, filename: '' } as File;
	});
	return <>
		<FormItem {...itemProps}>
			<Uploader
				multiple={true}
				files={filelist}
				deleteFileOnServer
				onChange={(files) => {
					onChange(files.map((file) => {
						return file.fileid;
					}));
				}}
				renderUploadList={(filelist) => {
					return <div className='list'>
						{filelist.filter((file) => {
							return file.status === 'done';
						}).map((file) => {
							if (file.status === 'done' || file.status === 'init') {
								const url = file.url || getfile((file.response as { fileid: string; filename: string; }).fileid);
								return <a href={file.url} key={file.uid} target='_blank' rel="noreferrer" >
									<div className='card'>
										<video className='video' src={url} />
									</div>
								</a>;
							} else if (file.status === 'error') {
								return <div key={file.uid}>Error</div>;
							} else if (file.status === 'uploading') {
								return <div key={file.uid}>Uploading...</div>;
							} else {
								return <div key={file.uid}>Unknown status</div>;
							}
						})}
					</div>;
				}}
			>
				<div className='card'>
					<img src={res['/images/fileadd.svg']} />
				</div>
			</Uploader>
		</FormItem>
		<style jsx>{`
.list{
display: flex;
flex-direction: row;
}
.card{
width: ${width};
height: ${height};
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background: #F2F3F5;
}
.card:hover{
background-color: #e5e6eb;
}
.video{
width: 100%;
height: 100%;
}
		`}</style>
	</>;
}
