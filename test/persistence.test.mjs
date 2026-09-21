import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Store} from '../src/store.mjs';
import {NestCore} from '../src/core.mjs';

test('fixture state survives store restart',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'the-nest-'));
  const db=join(dir,'state.sqlite');
  try{
    let store=new Store(db);
    let core=new NestCore(store);
    assert.equal(core.request({actor:'ADMIN',capability:'light.set',resource:'kitchen',params:{on:true}}).outcome,'SUCCESS');
    store.close();

    store=new Store(db);
    core=new NestCore(store);
    const read=core.request({actor:'ADMIN',capability:'light.read',resource:'kitchen'});
    assert.equal(read.outcome,'SUCCESS');
    assert.equal(read.evidence.scope.observed.on,true);
    store.close();
  }finally{
    await rm(dir,{recursive:true,force:true});
  }
});
