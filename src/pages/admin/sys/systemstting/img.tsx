import getfile from '../../../../atoms/getfile';
import Ui from '../../../../components/ui';
import SysKeyType from '../../../../db/01factory/type/sys-key';
import { File } from '../../../api/file/upload.api';
import getSysImgUrl from '../../../api/sys/get-sys-img-url';

/**
 * 图片设置
 */
export default function Img({
	label,
	data,
	sysKeyType: key,
	required,
	width,
	height,
	onChange,
	onDelete
}: {
	required?: boolean;
	label: string;
	width: number | string;
	height: number | string;
	data: Record<SysKeyType, string>;
	sysKeyType: SysKeyType;
	onChange(fid: string): void;
	onDelete(): void;
}) {
	const fileid = data[key];
	const filelist = fileid ? [{ fileid, filename: '' }] as File[] : [];
	const src = (() => {
		if (fileid) {
			return getfile(fileid);
		}
		console.log('type', key, data);
		return getSysImgUrl(key);
	})();
	return <>
		<Ui.Form.Item
			label={label}
			required={required}
			labelSpan={8}
		>
			<div className="img">
				<Ui.File.Uploader
					multiple={false}
					files={filelist}
					deleteFileOnServer
					onChange={(files) => {
						if (files.length > 0) {
							onChange(files[files.length - 1].fileid);
						} else {
							onDelete();
						}
					}}
					limit={1}
					listType='picture-card'
				>
					<img className='picture' title={`${width}*${height}`} src={src} />
				</Ui.File.Uploader>
			</div>
		</Ui.Form.Item>
		<style jsx>{`
.img {
width: 400px;
}

.picture {
width: ${width}px;
height: ${height}px;
}
		`}</style>
	</>;
}
