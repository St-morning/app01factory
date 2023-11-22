import Uploader from '../../file/uploader';
import { File } from '../../../pages/api/file/upload.api';
import res from '../../../atoms/res';
import getfile from '../../../atoms/getfile';
import FormItem, { IFormItemProps } from '../item';

/**
 * 头像
 */
export default function FormItemAvatar({
	fileid,
	onChange,
	...itemProps
}: {
	fileid: string;
	onChange(fid: string): void
} & IFormItemProps) {
	const filelist = fileid ? [{ fileid, filename: '' }] as File[] : [];
	const src = fileid ? getfile(fileid) : res['/images/sys/avatar.png'];
	return <>
		<FormItem label='头像' {...itemProps}>
			<Uploader
				multiple={false}
				files={filelist}
				deleteFileOnServer
				onChange={(files) => {
					if (files.length > 0) {
						onChange(files[files.length - 1].fileid);
					} else {
						onChange('');
					}
				}}
				listType='picture-card'
				limit={1}
			>
				<img className='picture' title='32*32' src={src} />
			</Uploader>
		</FormItem>
		<style jsx>{`
.picture{
border: 0.01875rem solid #D2CBCB;
border-radius: 5rem;
width: 5rem;
height: 5rem;
padding: 0.5rem;
}
		`}</style>
	</>;
}
