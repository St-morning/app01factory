export default function Block({
	width = '.4375rem',
	height = '1.125rem',
	color = '#165DFF',
	borderRadius = '0.1875rem'
}: {
	width?: string;
	height?: string;
	color?: string;
	borderRadius?: string;
}) {
	return <>
		<div></div>
		<style jsx>{`
div{
display: inline-block;
width: ${width};
height: ${height};
background: ${color};
border-radius: ${borderRadius};
}
`}</style>
	</>;
}
