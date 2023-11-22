import pages from '../../../atoms/pages';
import Ui from '../../../components/ui';

/**
 * 关联菜单
 */
export default function UnionMenu({
	roleid
}: {
	roleid: string;
}) {
	const url = `${pages['/admin/role/union-menu']}?roleid=${roleid}`;
	return <>
		<Ui.Link href={url} >
			<div className="bj">关联菜单</div>
		</Ui.Link>
		<style jsx>{`
		.bj{
width: 100%;
height: 100%;
cursor:pointer;
display: flex;
align-items: center;
color: #3F6FF6;
font: normal 400 14px normal;
padding: 0 .5rem;
}
		`}</style>
	</>;
}
