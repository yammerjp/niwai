import { config } from 'dotenv';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import postgres from 'postgres';

config({
  path: '.env.local',
});

const runMigrate = async () => {

  const client = new PGlite({
    dataDir: "./data"
  });
  
  const db = drizzle(client);

  console.log('⏳ Running migrations...');

  const start = Date.now();
  await migrate(db, { migrationsFolder: './lib/db/migrations' });
  const end = Date.now();

  console.log('✅ Migrations completed in', end - start, 'ms');

  console.log(((await client.query('SELECT * FROM pg_tables')).rows.map(r => r.tablename)));

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
