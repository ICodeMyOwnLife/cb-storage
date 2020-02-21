import{useState as e,useCallback as t,useEffect as n}from"react";var r=function(r){return function(i,a){void 0===a&&(a=null);var o=e(function(){return r.getData(i)||a}),u=o[0],s=o[1],l=t(function(e){s(function(t){var n=e instanceof Function?e(t):e;return r.setData(i,n),n})},[i]);return n(function(){var e=r.getData(i);null!=a&&null===e&&r.setData(i,a)},[i]),n(function(){var e=r.subscribe(function(e){e.storageArea===r.storage&&e.key===i&&s(r.deserialize(e.newValue))});return function(){return e()}},[i]),[u,l]}},i=function(e){if(null==e)return null;try{return JSON.parse(e)}catch(e){return null}},a=function(){function e(e,t,n){var r=this;void 0===t&&(t=JSON.stringify),void 0===n&&(n=i),this._storage=e,this._serialize=t,this._deserialize=n,this.getData=function(e){return r.deserialize(r.storage.getItem(e))},this.removeData=function(e){r.storage.removeItem(e),r.raiseEvent({key:e,newValue:""})},this.setData=function(e,t){var n=r.serialize(t);r.storage.setItem(e,n),r.raiseEvent({key:e,newValue:n})},this.subscribe=function(e){var t=function(t){return null==e?void 0:e({storageArea:t.storageArea,key:t.key,newValue:t.newValue})};return window.addEventListener("storage",t),function(){return window.removeEventListener("storage",t)}}}var t;return e.prototype.raiseEvent=function(e){window.dispatchEvent(new StorageEvent("storage",{key:e.key,newValue:e.newValue,storageArea:this.storage}))},(t=[{key:"deserialize",get:function(){return this._deserialize}},{key:"serialize",get:function(){return this._serialize}},{key:"storage",get:function(){return this._storage}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}();export{a as StorageService,r as createStorageHook};
//# sourceMappingURL=index.m.js.map
