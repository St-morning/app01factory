import Uploader from '../../file/uploader';
import { File } from '../../../pages/api/file/upload.api';
import res from '../../../atoms/res';
import getfile from '../../../atoms/getfile';
import FormItem, { IFormItemProps } from '../item';

/**
 * 图像
 */
export default function FormItemImages({
	fileids,
	width = '5rem',
	height = '5rem',
	onChange,
	limit,
	...itemProps
}: {
	fileids: string[];
	width?: string;
	height?: string;
	limit?: number;
	onChange(fids: string[]): void
} & IFormItemProps) {
	const filelist = fileids.map((fileid) => {
		return { fileid, filename: '' } as File;
	});
	return <>
		<FormItem {...itemProps}>
			<Uploader
				multiple={true}
				limit={limit}
				files={filelist}
				listType='picture-card'
				deleteFileOnServer
				onChange={(files) => {
					onChange(files.map((file) => {
						return file.fileid;
					}));
				}}
			>
				{filelist.length < limit && <img className='picture' title='120*120' src={res['/images/fileadd.png']} />}
			</Uploader>
		</FormItem>
		<style jsx>{`
.picture{
width: ${width};
height: ${height};
padding: 0.5rem;
}
		`}</style>
	</>;
}
