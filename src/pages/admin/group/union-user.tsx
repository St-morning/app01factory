import pages from '../../../atoms/pages';
import Ui from '../../../components/ui';

export default function UnionUser({
	groupid
}: {
	groupid: string;
}) {
	const url = `${pages['/admin/group/union-user']}?groupid=${groupid}`;
	return <>
		<Ui.Link href={url}>
			<span className="union">关联用户</span>
		</Ui.Link>
		<style jsx>{`
.union {
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
