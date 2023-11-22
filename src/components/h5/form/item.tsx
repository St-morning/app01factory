import { ReactNode } from 'react';

/**
 * 表单项
 */
export default function FormItem({
	children,
	required,
	label,
}: {
	required?: boolean;
	label?: ReactNode;
	children?: ReactNode;
}) {
	const labelClassName = required ? 'required label' : 'label';
	return <div className='container'><span className={labelClassName}>{label}</span>
		<span>{children}</span>
		<style jsx>{`
.required::before{
content: '*';
color: #f00;
margin-right: 5px;
}
.label{
font-size: 14px;
float: right;
}
.container{
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
}
`}</style>
	</div>;
}
