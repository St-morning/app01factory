import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import h5 from '../../../atoms/h5';
import pages from '../../../atoms/pages';
import res from '../../../atoms/res';
import H5 from '../../../components/h5';
import { useState } from 'react';

type IProps = {
};

/**
 * Demos
 */
const Page: NextPage<IProps> = () => {
	const [files, setfiles] = useState([] as string[]);
	return (
		<>
			<Head>
				<title>Demos</title>
			</Head>
			{/* Demos */}
			{/* <H5.NavBar title='标题' /> */}
			<H5.TabBar
				dataSource={[{
					title: <H5.Link href={pages['/h5/home']}><span>H5 Home</span></H5.Link>
				}, {
					title: <H5.Link href={pages['/h5/demos']}><span>Demos</span></H5.Link>
				}]}
				fixed={false}
			/>
			<H5.Pagination
				current={1}
				total={10}
				pageSize={8}
				icon
				onChange={({ current }) => {

				}} />
			<H5.Tabs tabs={[
				{ title: 'Example 1' },
				{ title: 'Example 2' },
				{ title: 'Very long first Example' },
				{ title: 'Very long second Example' },
			]} >
				<div>Example 1 content area</div>
				<div>Example 2 content area</div>
				<div>Very long first Example content area</div>
				<div>Very long second Example Content area</div>
			</H5.Tabs>
			<H5.DropdownMenu
				options={[
					{
						label: 'Haidian District',
						value: 0,
						disabled: false,
						children: [{
							label: 'Low floor',
							value: 0,
							disabled: false,
						},
						{
							label: 'Middle floor',
							value: 1,
						},
						{
							label: 'High floor',
							value: 2,
							disabled: true,
						}]
					},
					{
						label: 'Fengtai District',
						value: 1,
						children: [{
							label: 'Low floor',
							value: 0,
							disabled: false,
						},
						{
							label: 'Middle floor',
							value: 1,
						}],
					},
					{
						label: 'Changping District',
						value: 2,
						disabled: true,
						children: [{
							label: 'Low floor',
							value: 0,
						}]
					}
				]}
				onOptionClick={(value: any, item: any) => {
					console.info('click', value, item.label);
				}}
				onOptionChange={(value: any, item: any) => {
					console.info(value, item);
				}}
			/>
			<H5.Loading />
			<H5.Button bgColor='#FA9F75' onClick={() => {
				h5.toast('You clicked me!');
			}} >Click Me to see toast</H5.Button>
			<H5.Button onClick={() => {
				h5.popup(<div className='dlg'>
					Nothing here
					<style jsx>{`
.dlg{
height: 10rem;
}
`}</style>
				</div>);
			}} >Click Me to see popup</H5.Button>
			<H5.Button onClick={() => {
				h5.notify.success('Succcess!');
			}} >Click Me to see sccess message</H5.Button>
			<H5.ActionSheet items={[{
				content: <span>eg1</span>,
				onClick(e?) {
					console.log('You\'ve clicked eg1');
				},
			}]}><H5.Button>Click me to see options</H5.Button></H5.ActionSheet>
			<H5.Grid
				data={[{
					img: <img src={res['/images/sys/homelogo.png']} />,
					title: 'Title Text',
					itemStyle: { padding: 16 }
				}, {
					img: <img src={res['/images/sys/homelogo.png']} />,
					title: 'Title Text',
					itemStyle: { padding: 16 }
				}, {
					img: <img src={res['/images/sys/homelogo.png']} />,
					title: 'Title Text',
					itemStyle: { padding: 16 }
				}]}
				columns={3}
				shape='circle'
				border
			/>
			<H5.Collapse
				defaultActive
				value='2'
				header='单个'
				content='2222'
			/>
			<H5.Collapse.Group
				useAccordion
				defaultActiveItems={['2']}
			>
				<H5.Collapse
					value='1'
					header='复合1'
					content='blablabla'
				/>
				<H5.Collapse
					defaultActive
					value='2'
					header='复合2'
					content='2222'
				/>
			</H5.Collapse.Group>
			<H5.Image src={res['/images/sys/homelogo.png']} preview />
			<H5.Popover
				content="内容"
				direction="topCenter"
				theme="white"
				bordered={false}
				needShadow
				touchOtherToClose
				onChange={visible => {
					console.log('The bubble state is switched to', visible);
				}}
			>
				<H5.Button>气泡</H5.Button>
			</H5.Popover>
			<H5.Popover.Menu
				direction="bottomLeft"
				onSelect={value => console.log('select', value)}
				menu={[{
					text: 'Menu text111',
					value: '111'
				}, {
					text: 'Menu text222',
					value: '222'
				}]}
				theme="white"
				onClickMenuItem={() => {

				}}
			>
				<H5.Button>Menu</H5.Button>
			</H5.Popover.Menu>
			<H5.Steps current={1} items={[{
				title: 'Start',
			}, {
				title: 'In progress',
			}, {
				title: 'Step 3',
			}, {
				title: 'Finish',
			}]} onClick={(index) => { console.log(index); }} />
			<H5.Tag filleted type="solid" bgColor="#00B42A">Tag</H5.Tag>
			<H5.Avatar size="large" src={res['/images/sys/user.svg']} />
			<H5.Text badge={{
				text: '8'
			}} >lalala</H5.Text>
			<H5.Cell label="列表项1" bordered={true} />
			<H5.Cell label="列表项2" bordered={true} />
			<H5.Cell
				bordered={false}
				label={<span>列表项3</span>}
				showArrow
			/>
			<H5.Checkbox value={1}>Option</H5.Checkbox>
			<H5.DatePicker
				minTs={Date.now() - 1000 * 60 * 60 * 24}
				currentTs={Date.now()}
				title="时间选择"
				mode="datetime"
				onChange={(timestamp, obj) => {
					console.info('---demo on change index', timestamp);
				}}
			>
				<H5.Button>Time</H5.Button>
			</H5.DatePicker>
			<H5.DatePicker
				minTs={Date.now() - 1000 * 60 * 60 * 24}
				currentTs={Date.now()}
				title="日期选择"
				mode="date"
				onChange={(timestamp, obj) => {
					console.info('---demo on change index', timestamp);
				}}
			>
				<H5.Button>Date</H5.Button>
			</H5.DatePicker>
			<H5.Button onClick={() => {
				h5.dialog.alert({
					title: 'aaa',
					okText: '确定'
				});
			}}>alert</H5.Button>
			<H5.Button onClick={() => {
				h5.dialog.confirm({
					title: 'aaa',
					okText: 'OK',
					cancelText: 'Cancel',
					onOk(e) {
						console.log('confirmed');
					},
				});
			}}>confirm</H5.Button>
			<H5.Button onClick={() => {
				h5.dialog.open({
					title: 'aaa'
				});
			}}>Dialog</H5.Button>
			<H5.ImagePicker
				defaultImages={files}
				onChange={(files) => {
					console.log('ooooooooooooooooooooo', files);
					setfiles(files);
				}}
				limit={3}
				maxSize={500}
			/>
			<H5.NoticeBar marquee='always'>提示：不要写太多组件，写多了会晕</H5.NoticeBar>
			<H5.Cell label="Switch">
				<H5.Switch
					checked={true}
					platform="ios"
					onChange={(value) => {
						// eslint-disable-next-line
						console.info('---onChange', value);
					}}
				/>
			</H5.Cell>
			<H5.Stepper max={10} min={0} digits={2} />
			<H5.Swiper>
				<H5.Swiper.Slide>
					<img data-src={res['/images/sys/homelogo.png']} className='swiper-lazy' />
					<div className="swiper-lazy-preloader"></div>
				</H5.Swiper.Slide>
				<H5.Swiper.Slide>
					<img data-src={res['/images/sys/logout.png']} className='swiper-lazy' />
					<div className="swiper-lazy-preloader"></div>
				</H5.Swiper.Slide>
				<H5.Swiper.Slide>
					<img data-src={res['/images/sys/group.svg']} className='swiper-lazy' />
					<div className="swiper-lazy-preloader"></div>
				</H5.Swiper.Slide>
			</H5.Swiper>
			<H5.TabBar
				activeIndex={1}
				onChange={async (idx) => {
					// 如果要达到比较好的跳转效果，需要在页面初始化之后调用prefetch预加载要跳转的页面
					// await Router.prefetch(pages['/h5/home']);
					await Router.push(pages['/h5/home']);
				}}
				dataSource={[{
					title: 'Home',
					icon(active) {
						// 经常会用两种不同图标展示
						return active ? <img src={res['/images/sys/homelogo.png']} /> : <img src={res['/images/sys/homelogo.png']} />;
					}
				}, {
					title: 'My',
					icon: <img src={res['/images/sys/homelogo.png']} />
				}]}
				fixed={false}
			/>
			<H5.Rate count={5} value={5} allowHalf step={2} size='0.3rem' />
			<H5.Button onClick={() => {
				const handler = h5.popup(<div style={{ height: 330, width: 290 }}>
					<div onClick={() => {
						handler.close();
					}}>
						<span>这里显示了一些文字，
							这些文字还比较长，
							作为一个弹出层显示到界面，
							点击有文字的地方可关闭弹窗
						</span>
					</div>
				</div>);
			}}>
				弹出提示框
			</H5.Button>
			<H5.PopupSwiper
				visible={false}
				close={() => {
					console.log('关闭事件');
				}}
				allowSwipeDirections={['bottom']}
				exitDirection={'bottom'}
			>
				<span>这里显示了一些文字，
					这些文字还比较长，
					作为一个弹出层显示到界面，
					点击有文字的地方可关闭弹窗
				</span>
			</H5.PopupSwiper>
			<H5.Picker
				cascade
				touchToStop
				cols={2}
				onChange={(val) => {
					// todo
				}}
				data={[{
					label: '河南省',
					value: 'henan',
					children: [{
						label: '郑州',
						value: '国际郑'
					}]
				}, {
					label: '河北省',
					value: 'hebei',
					children: [{
						label: '石家庄',
						value: '国际庄'
					}]
				}]}
			>
				<span>点击弹出选择</span>
			</H5.Picker>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
