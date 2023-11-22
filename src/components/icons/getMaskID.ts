export default function getMaskID() {
	return `master_svg${Math.random().toFixed(8).toString().replace(/\./, '')}`;
}
