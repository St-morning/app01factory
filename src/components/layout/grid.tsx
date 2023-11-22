import { Grid } from '@arco-design/web-react';
import { ReactNode } from 'react';

export default function LayoutGrid({
	rows
}: {
	rows: ReactNode[][];
}) {
	const cols = rows.reduce((n, row) => {
		return Math.max(n, row.length);
	}, 0);
	const col = 24 / cols;
	return <Grid.Col>
		{rows.map((row, rowno) => {
			return <Grid.Row key={`gr${rowno}`}>
				{row.map((com, colno) => {
					return <Grid.Col span={col} key={`gl${rowno}/${colno}`}>
						{com}
					</Grid.Col>;
				})}
			</Grid.Row>;
		})}
	</Grid.Col>;
}
