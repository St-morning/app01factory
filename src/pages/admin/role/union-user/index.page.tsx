import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import ctrls from '../../../api/ctrls';
import Body from './body';

type IProps = {
	roleid: string;
	rolename: string;
};

/**
 * 关联用户
 */
const Page: NextPage<IProps> = ({ roleid, rolename }) => {
	return (
		<>
			<Head>
				<title>关联用户</title>
			</Head>
			<Body roleid={roleid} rolename={rolename} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	const roleid = query.roleid;
	const role = await ctrls.sysRole.getByID(roleid);
	const rolename = role.rolename;
	return {
		props: {
			roleid,
			rolename
		}
	};
};
