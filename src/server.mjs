#!/usr/bin/env node
import {createNestServer} from './server-lib.mjs';
const host=process.env.NEST_HOST||'127.0.0.1';
const port=Number(process.env.NEST_PORT||8787);
const dbPath=process.env.NEST_DB||'./nest.sqlite';
const {server}=createNestServer({dbPath});
server.listen(port,host,()=>console.log(`The Nest listening on http://${host}:${port}`));
