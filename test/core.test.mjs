import test from 'node:test';
import assert from 'node:assert/strict';
import {Store} from '../src/store.mjs';
import {NestCore} from '../src/core.mjs';
function withCore(fn){const s=new Store(':memory:');try{return fn(new NestCore(s));}finally{s.close();}}
test('admin write succeeds with evidence',()=>withCore(c=>{
  const r=c.request({actor:'ADMIN',capability:'light.set',resource:'kitchen',params:{on:true}});
  assert.equal(r.outcome,'SUCCESS');assert.equal(r.evidence.scope.observed.on,true);
}));
test('restricted light write denied',()=>withCore(c=>assert.equal(c.request({actor:'RESTRICTED_USER',capability:'light.set',resource:'kitchen',params:{on:true}}).outcome,'DENIED')));
test('missing target clarifies',()=>withCore(c=>assert.equal(c.request({actor:'ADMIN',capability:'light.set',params:{on:true}}).outcome,'CLARIFICATION_REQUIRED')));
test('offline resource fails',()=>withCore(c=>assert.equal(c.request({actor:'ADMIN',capability:'light.set',resource:'garage',params:{on:true}}).outcome,'FAILED')));
test('unavailable observation is uncertain',()=>withCore(c=>assert.equal(c.request({actor:'STANDARD_USER',capability:'presence.read'}).outcome,'UNCERTAIN')));
