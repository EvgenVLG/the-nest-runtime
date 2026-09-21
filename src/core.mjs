import {randomUUID} from 'node:crypto';
const roles=new Set(['ADMIN','STANDARD_USER','RESTRICTED_USER']);
const resources={
  kitchen:{kind:'light',online:true},
  garage:{kind:'light',online:false},
  presence:{kind:'presence',available:false}
};
function allow(actor,capability){
  if(!roles.has(actor)) return false;
  if(actor==='ADMIN') return true;
  if(actor==='STANDARD_USER') return ['light.set','light.read','presence.read'].includes(capability);
  return capability==='presence.read';
}
export class NestCore{
  constructor(store){this.store=store;}
  request(input={}){
    const correlation_id=input.correlation_id||randomUUID();
    const finish=(outcome,evidence=null,extra={})=>{
      const result={correlation_id,outcome,evidence,...extra};
      this.store.record(result);
      return result;
    };
    const actor=String(input.actor||'UNKNOWN');
    const capability=String(input.capability||'');
    const resource=input.resource?String(input.resource):null;

    if(!capability) return finish('UNSUPPORTED',null,{reason:'CAPABILITY_REQUIRED'});
    if(!allow(actor,capability)) return finish('DENIED',{kind:'POLICY',source:'fixture-policy',scope:{actor,capability}},{reason:'NOT_AUTHORIZED'});

    if(capability==='light.set'){
      if(!resource) return finish('CLARIFICATION_REQUIRED',null,{reason:'RESOURCE_REQUIRED'});
      const r=resources[resource];
      if(!r||r.kind!=='light') return finish('UNSUPPORTED',null,{reason:'RESOURCE_UNSUPPORTED'});
      if(!r.online) return finish('FAILED',{kind:'SIMULATED_DEVICE',source:resource,scope:{online:false}},{reason:'RESOURCE_OFFLINE'});
      const on=Boolean(input.params?.on);
      this.store.set('light:'+resource,{on});
      return finish('SUCCESS',{kind:'SIMULATED_DEVICE',source:resource,scope:{observed:{on}}});
    }

    if(capability==='light.read'){
      if(!resource) return finish('CLARIFICATION_REQUIRED',null,{reason:'RESOURCE_REQUIRED'});
      const r=resources[resource];
      if(!r||r.kind!=='light') return finish('UNSUPPORTED',null,{reason:'RESOURCE_UNSUPPORTED'});
      if(!r.online) return finish('FAILED',{kind:'SIMULATED_DEVICE',source:resource,scope:{online:false}},{reason:'RESOURCE_OFFLINE'});
      const state=this.store.get('light:'+resource,{on:false});
      return finish('SUCCESS',{kind:'SIMULATED_DEVICE',source:resource,scope:{observed:state}});
    }

    if(capability==='presence.read'){
      if(!resources.presence.available) return finish('UNCERTAIN',{kind:'SIMULATED_SENSOR',source:'presence',scope:{available:false}},{reason:'OBSERVATION_UNAVAILABLE'});
    }
    return finish('UNSUPPORTED',null,{reason:'CAPABILITY_UNSUPPORTED'});
  }
}
