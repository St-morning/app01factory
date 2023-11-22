import { ReactNode } from 'react';

/**
 * 表单的分组容器
 */
export default function FormGroup({
	title,
	icon,
	color = '#165DFF',
	children
}: {
	title: ReactNode;
	children: ReactNode;
	icon?: string | ReactNode;
	color?: string;
}) {
	const elIcon = typeof icon === 'string' ? <img src={icon} /> : icon;
	return <div>
		<div className='groupTitle'>
			<div className='label'>{title}</div>
			{elIcon}
		</div>
		<div className='content'>
			{children}
		</div>
		<style jsx>{`
			.groupTitle{
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
}
.label::before{
content: '';
display: inline-block;
width: .4375rem;
height: 1.125rem;
background: ${color};
margin-right: 0.5rem;
vertical-align: -10%;
border-radius: 3px;
}
.label{
margin: 0 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #1D2129;
}
`}</style>
	</div>;
}
