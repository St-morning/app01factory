import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import redirect from '../../../atoms/redirect';
import pages from '../../../atoms/pages';
import { SysTbimpexpResult4 } from '../../api/controllers/sys/tbimpexp';
import ctrls from '../../api/ctrls';
import api from '../../../atoms/api';
import mmLogger from '../../../atoms/server/logger';
import Ui from '../../../components/ui';

const logger = mmLogger('pages/admin/impexp');

type IProps = {
	data: SysTbimpexpResult4[];
};

/**
 * 导入数据表
 */
const page: NextPage<IProps> = ({ data }) => {
	return (
		<>
			<Head>
				<title>数据维护</title>
			</Head>
			<Ui.MainContainer
				title='基础数据维护'
				subTitle={<Ui.Button.File
					title='导入'
					url={api['/api/file/imp-data']}
				/>}
			>

				<Ui.Table
					data={data}
					keyField='name'
					showHeader={false}
					columns={[{
						title: '',
						dataIndex: 'alias',
						render(val, item, index) {
							const url = `${api['/api/file/exp-data']}?tableName=${item.name}&tableAlias=${item.alias}`;
							return <a href={url}>{val || item.name}</a>;
						},
					}]}
					pagination={false}
				/>
			</Ui.MainContainer>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

// pre-render this page on each request
// eslint-disable-next-line require-await, @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<IProps> = async () => {
	if (process.env.NODE_ENV === 'production') {
		logger.error('Someone is trying to hack us.');
		return redirect(pages['/405']);	// todo status shoud be 406
	} else {
		const data = await ctrls.sysTbimpexp.listAllTableName();
		return {
			props: {
				data
			}
		};
	}
};

