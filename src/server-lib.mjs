import http from 'node:http';
import {Store} from './store.mjs';
import {NestCore} from './core.mjs';
async function readBody(req){
  const chunks=[];
  for await(const chunk of req) chunks.push(chunk);
  return chunks.length?JSON.parse(Buffer.concat(chunks).toString('utf8')):{};
}
export function createNestServer({dbPath=':memory:'}={}){
  const store=new Store(dbPath);
  const core=new NestCore(store);
  const server=http.createServer(async(req,res)=>{
    res.setHeader('content-type','application/json');
    try{
      if(req.method==='GET'&&req.url==='/healthz'){res.end(JSON.stringify({ok:true}));return;}
      if(req.method==='POST'&&req.url==='/api/request'){
        res.end(JSON.stringify(core.request(await readBody(req))));
        return;
      }
      res.statusCode=404;res.end(JSON.stringify({error:'NOT_FOUND'}));
    }catch{
      res.statusCode=400;res.end(JSON.stringify({error:'BAD_REQUEST'}));
    }
  });
  server.on('close',()=>store.close());
  return {server,core,store};
}
