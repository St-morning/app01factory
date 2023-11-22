import { toBuffer } from 'qrcode';

export default function qrcode(text: string) {
	return toBuffer(text);
}
