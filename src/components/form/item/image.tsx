import Uploader from '../../file/uploader';
import { File } from '../../../pages/api/file/upload.api';
import res from '../../../atoms/res';
import getfile from '../../../atoms/getfile';
import FormItem, { IFormItemProps } from '../item';

/**
 * 图像
 */
export default function FormItemImage({
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
	const src = fileid ? getfile(fileid) : res['/images/sys/avatar.png'];
	return <>
		<FormItem {...itemProps}>
			<Uploader
				multiple={false}
				files={filelist}
				listType='picture-card'
				limit={1}
				deleteFileOnServer
				onChange={(files) => {
					onChange(files[files.length - 1].fileid);
				}}
			>
				<img className='picture' title='32*32' src={src} />
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
