import getSize from './getSize';

export default function TodoIcon({
	color
}: {
	color: string;
}) {
	const { width, height } = getSize();
	return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
		<g>
			<path d="M1,20C1,20,17,20,17,20C17.5523,20,18,19.5523,18,19C18,19,18,1,18,1C18,0.447715,17.5523,0,17,0C17,0,1,0,1,0C0.447715,0,0,0.447715,0,1C0,1,0,19,0,19C0,19.5523,0.447715,20,1,20C1,20,1,20,1,20ZM16,2C16,2,16,18,16,18C16,18,2,18,2,18C2,18,2,2,2,2C2,2,16,2,16,2C16,2,16,2,16,2ZM4,5C4,5,12,5,12,5C12,5,12,7,12,7C12,7,4,7,4,7C4,7,4,5,4,5C4,5,4,5,4,5ZM10,9C10,9,4,9,4,9C4,9,4,11,4,11C4,11,10,11,10,11C10,11,10,9,10,9C10,9,10,9,10,9Z" fillRule="evenodd" fill={color} fillOpacity="1" />
		</g>
	</svg>;
}
