import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "@/env";
import * as schema from "./schema";

// .connection becasue of annoying warning, if something goes wrong, put it back
/* 
const client = new Client({
  url: env.DATABASE_URL,
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
}).connection();
*/

const client = new Client({
  url: env.DATABASE_URL,
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});
export const db = drizzle(client, { schema });

// https://orm.drizzle.team/docs/get-started-mysql

// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";

// create the connection
// const connection = connect({
//   host: process.env["DATABASE_HOST"],
//   username: process.env["DATABASE_USERNAME"],
//   password: process.env["DATABASE_PASSWORD"],
// });

// export const db = drizzle(connection);
