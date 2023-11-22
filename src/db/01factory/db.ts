import knex, { Knex } from 'knex';
import mmLogger from '../../atoms/server/logger';

const logger = mmLogger('db/01factory');

const config = JSON.parse(process.env.MM_DBS) as Record<string, Knex.Config>;

const db = knex({
	debug: true,
	...config['01factory'],
	log: {
		debug(...args) {
			logger.debug(...args);
		},
		warn(...args) {
			logger.warn(...args);
		},
		error(...args) {
			logger.error(...args);
		},
		enableColors: true,
	}
});

export default function get01factoryDb() {
	return db;
}
