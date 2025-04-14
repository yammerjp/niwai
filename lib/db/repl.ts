import { config } from 'dotenv';
import { PGlite } from '@electric-sql/pglite';
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

config({
  path: '.env.local',
});

const main = async () => {
  const client = new PGlite({
    dataDir: "./data"
  });
  
  console.log('⏳ Running repl...');

  const rl = readline.createInterface({ input, output });
  // > と表示し、その上で1行入力があったら、client.query(でクエリを実行する
  // クエリを実行したら、結果を表示する
  while (true) {
    const line = await rl.question('> ');
    const result = await client.query(line);
    console.log(result);
  }
}

main()
