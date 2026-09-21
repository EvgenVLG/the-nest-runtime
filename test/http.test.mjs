import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createNestServer} from '../src/server-lib.mjs';
test('HTTP entrypoint uses real authority path',async()=>{
  const {server}=createNestServer();
  server.listen(0,'127.0.0.1');await once(server,'listening');
  const port=server.address().port;
  const response=await fetch(`http://127.0.0.1:${port}/api/request`,{
    method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({actor:'ADMIN',capability:'light.set',resource:'kitchen',params:{on:true}})
  });
  const data=await response.json();
  assert.equal(data.outcome,'SUCCESS');
  server.close();await once(server,'close');
});
