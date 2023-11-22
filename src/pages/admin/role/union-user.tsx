import pages from '../../../atoms/pages';
import Ui from '../../../components/ui';

/**
 * 关联用户
 */
export default function UnionUser({
	roleid
}: {
	roleid: string;
}) {
	const url = `${pages['/admin/role/union-user']}?roleid=${roleid}`;
	return <>
		<Ui.Link href={url}>
			<div className="bj" onClick={() => { }}>关联用户</div>
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
