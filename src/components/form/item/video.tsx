import res from '../../../atoms/res';
import { File } from '../../../pages/api/file/upload.api';
import Uploader from '../../file/uploader';
import FormItem, { IFormItemProps } from '../item';

/**
 * 图像
 */
export default function FormItemVideo({
	fileid,
	width = '5rem',
	height = '5rem',
	onChange,
	...itemProps
}: {
	fileid: string;
	width?: string;
	height?: string;
	onChange(fid: string): void
} & IFormItemProps) {
	const filelist = fileid ? [{ fileid, filename: '' }] as File[] : [];
	return <>
		<FormItem {...itemProps}>
			<Uploader
				multiple={false}
				files={filelist}
				limit={1}
				deleteFileOnServer
				onChange={(files) => {
					onChange(files[files.length - 1].fileid);
				}}
				renderUploadItem={(_originNode, file) => {
					return <a href={file.url} target='_blank' rel="noreferrer">
						<div className='card'>
							<div className='close' title='Remove Video' onClick={(e) => {
								onChange('');
								e.nativeEvent.preventDefault();
							}}>X</div>
							<video className='video' src={file.url} />
						</div>
					</a>;
				}}
			>
				<div className='card'>
					<img src={res['/images/fileadd.svg']} />
				</div>
			</Uploader>
		</FormItem>
		<style jsx>{`
.close{
color: #fff;
position: absolute;
left: calc(${width} - 0.5rem);
padding:0.3rem 0.3rem;
top:0;
transition: 400ms;
}
.card:hover .close{
background-color: #fff;
color: #f00;
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
