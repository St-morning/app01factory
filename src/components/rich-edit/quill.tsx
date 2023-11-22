import { useEffect, useRef, useState } from 'react';
import BaseQuill from 'quill';
import 'quill/dist/quill.snow.css';

export default function Quill({
	value = '',
	onChange
}: {
	value?: string;
	onChange?(value: string): void;
}) {
	const [editor, seteditor] = useState<BaseQuill>();
	const el = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (el.current && !editor) {
			const toolbar = [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['blockquote', 'code-block'],

				// [{ 'header': 1 }, { 'header': 2 }], // custom button values
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				[{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
				[{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent

				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

				[{ 'color': [] as string[] },
				{ 'background': [] as string[] }], // dropdown with defaults from theme
				[{ 'font': [] as string[] }],
				[{ 'align': [] as string[] }],
				['link', 'image'],

				['clean'] // remove formatting button
			];
			const editor = new BaseQuill(el.current, {
				modules: {
					toolbar
				},
				theme: 'snow'
			});
			editor.on('text-change', (v) => {
				onChange && onChange(editor.root.innerHTML);
			});
			seteditor(editor);
		}
	}, [el.current, value, editor]);
	useEffect(() => {
		if (editor) {
			const oldValue = editor.root.innerHTML;
			if (oldValue === '<p><br></p>' && Boolean(value)) {
				editor.clipboard.dangerouslyPasteHTML(0, value);
				// editor.blur();
			}
		}
	}, [value, editor]);
	return <>
		<div ref={el}></div>
	</>;
}
