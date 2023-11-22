import { ReactNode } from 'react';

/**
 * 文本框
 */
export default function FormItemText({
	label,
	value
}: {
	label?: ReactNode;
	value?: ReactNode;
}) {
	return <div className={'row'}>{label && <span className='text label'>{label}</span>}{value && <p className='text value'>{value}</p>}
		<style jsx>{`
.row{
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
}
.text{
font-family: 'Microsoft YaHei UI';
color: #3E4D5C;
text-align: left;
}
.label{
margin-right: 0.25rem;
white-space:nowrap;
}
.value{
margin: 0;
word-wrap:break-word;
white-space:normal;
}
`}</style>
	</div>;
}
