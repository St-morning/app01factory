import dynamic from 'next/dynamic';
import FormItem, { IFormItemProps } from '../item';

const Quill = dynamic(() => {
	return import('../../rich-edit/quill');
}, {
	ssr: false
});

/**
 * 富文本
 */
export default function FormItemRichEdit({
	required,
	label,
	labelSpan = 4,
	separator,
	labelAfter,
	labelAfterSpan,
	labelValign = 'start',
	...props
}: {
	value?: string;
	onChange?(value: string): void;
} & IFormItemProps) {
	return <FormItem
		required={required}
		label={label}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfter={labelAfter}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	>
		<Quill
			{...props}
		/>
	</FormItem>;
}
