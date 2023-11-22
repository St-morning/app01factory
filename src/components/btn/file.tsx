import { Message } from '@arco-design/web-react';
import { ReactNode } from 'react';
import res from '../../atoms/res';
import Uploader from '../file/uploader';
import Btnicon from './icon';

/**
 * 上传按钮
 */
export default function ButtonFile({
	title,
	url,
	icon = res['/images/sys/upload.svg'],
	onUploaded,
	onError = (err) => {
		Message.error(err);
	}
}: {
	title: string | ReactNode;
	/**
	 * 按钮左侧图标
	 */
	icon?: string;
	url: string;
	onUploaded?(file: {
		fileid: string;
		filename: string;
	}): Promise<void> | void;
	onError?(err: string): void;
}) {
	return <Uploader
		files={[]}
		action={url}
		deleteFileOnServer={false}
		multiple={true}
		// limit={1}
		onChange={async (files) => {
			const [file] = files;
			onUploaded && await onUploaded(file);
			Message.success('上传成功');
			// Router.reload();
		}}
		onError={onError}
		renderUploadList={() => {
			return <span></span>;
		}}
	>
		<Btnicon
			title={title}
			icon={icon}
		/>
	</Uploader >;
}
