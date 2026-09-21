#!/usr/bin/env node
import {Store} from '../src/store.mjs';
import {NestCore} from '../src/core.mjs';
const store=new Store(':memory:');
const core=new NestCore(store);
for(const c of [
  {actor:'ADMIN',capability:'light.set',resource:'kitchen',params:{on:true}},
  {actor:'RESTRICTED_USER',capability:'light.set',resource:'kitchen',params:{on:false}},
  {actor:'ADMIN',capability:'light.set'},
  {actor:'ADMIN',capability:'light.set',resource:'garage',params:{on:true}},
  {actor:'STANDARD_USER',capability:'presence.read'}
]) console.log(JSON.stringify(core.request(c),null,2));
store.close();
