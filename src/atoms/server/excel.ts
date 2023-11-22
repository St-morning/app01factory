import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readFile, utils, writeFileXLSX } from 'xlsx';
import uuid from './uuid';

export default {
	excel2json<T>(filepath: string) {
		const wb = readFile(filepath);
		const names = wb.SheetNames;
		const ws = wb.Sheets[names[0]];
		return utils.sheet_to_json<T>(ws);
	},
	json2excel<T>(data: T[]) {
		const wb = utils.book_new();
		const ws = utils.json_to_sheet(data);
		utils.book_append_sheet(wb, ws);
		const filepath = join(tmpdir(), `${uuid()}.xlsx`);
		writeFileXLSX(wb, filepath);
		return filepath;
		// res.setHeader('Content-Disposition', `inline; filename= ${encodeURIComponent('xxx.xlsx')}`);
		// const rs = createReadStream(filePath);
		// rs.pipe(res);
	}
};
