import { ImagePicker as Base, ImagePreview } from '@arco-design/mobile-react';
import { ImagePickItem, ImagePickerProps as Props } from '@arco-design/mobile-react/esm/image-picker';
// import '@arco-design/mobile-react/esm/picker/style/css/index.css';
// import '@arco-design/mobile-react/esm/picker-view/style/css/index.css';
import '@arco-design/mobile-react/esm/image-preview/style/css/index.css';
import '@arco-design/mobile-react/esm/image-picker/style/css/index.css';
import { useEffect, useState } from 'react';
import h5Dialog from '../../../atoms/h5/dialog';
import h5Toast from '../../../atoms/h5/toast';
import api from '../../../atoms/api';
import getfile from '../../../atoms/getfile';

/**
 * 图片选择器
 */
export default function ImagePicker({
	defaultImages = [],
	onChange,
	onClick,
	onMaxSizeExceed,
	onLimitExceed,
	...props
}: Omit<Props, 'images' | 'onChange'> & { defaultImages?: string[]; onChange(fileids: string[]): void }) {
	const [images, setImages] = useState(defaultImages.map((fileid) => {
		return {
			fileid,
			url: getfile(fileid)
		} as ImagePickItem;
	}));
	return <Base
		multiple
		images={images}
		upload={async (file) => {
			const formData = new FormData();
			formData.append('file', file.file);
			const ret = await fetch(api['/api/file/upload'], {
				method: 'put',
				body: formData
			});
			const fileinfo = await ret.json() as {
				fileid: string;
				filename: string;
			};
			const url = getfile(fileinfo.fileid);
			return {
				status: 'loaded',
				url,
				fileid: fileinfo.fileid
			};
		}}
		onChange={(images) => {
			setImages(images);
			onChange && images.find((img) => {
				return img.status === undefined || img.status === 'loaded';
			}) && onChange(images.map((img) => {
				return (img as unknown as { fileid: string; }).fileid;
			}));
		}}
		onClick={(e, image, index) => {
			if (onClick) {
				onClick(e, image, index);
			} else {
				console.log('files', images, index);
				ImagePreview.open({
					// todo 这里多张图片展示有问题，后面图片显示不出来
					// images: images.map((i) => {
					// 	return {
					// 		src: i.url
					// 	};
					// }),
					// openIndex: index,
					// loop: true,
					images: images.filter((_img, i) => {
						return i === index;
					}).map((i) => {
						return {
							src: i.url
						};
					}),
					openIndex: 0,
					showLoading: true,
					onImageDoubleClick(index) {
						console.log('dbl click', index);
					},
					onImageLongTap(index, image) {
						console.log('long tap', index, image);
						h5Dialog.confirm({
							title: 'Confirm to delete?',
							onOk: () => {
								setImages(images.filter((_i, j) => {
									return j !== index;
								}));
							},
						});
					},
				});
			}
		}}
		onLongPress={(e, image, index) => {
			h5Dialog.confirm({
				title: 'Confirm to delete?',
				onOk: () => {
					setImages(images.filter((_i, j) => {
						return j !== index;
					}));
				},
			});
		}}
		onMaxSizeExceed={(file) => {
			if (onMaxSizeExceed) {
				onMaxSizeExceed(file);
			} else {
				h5Toast(`${file.name} over ${props.maxSize}K`);
			}
		}}
		onLimitExceed={(files) => {
			if (onLimitExceed) {
				onLimitExceed(files);
			} else {
				h5Toast(`Select up to ${props.limit} images`);
			}
		}}
		{...props}
	/>;
}
