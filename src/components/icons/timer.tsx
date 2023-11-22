import getSize from './getSize';

export default function TimerIcon({
	color
}: {
	color: string;
}) {
	const { width, height } = getSize();
	return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
		<g>
			<path d="M10,20C4.477,20,0,15.523,0,10C0,4.477,4.477,0,10,0C15.523,0,20,4.477,20,10C20,15.523,15.523,20,10,20ZM11,10L11,5L9,5L9,12L15,12L15,10L11,10Z" fill={color} fillOpacity="1" />
		</g>
	</svg>;
}
