// var sys = require('sys'); // enable for debugging this module
function replace(a, b)
{
 if (!b) return a;
 var key;
 for (key in b) a[key] = b[key];
 return a;
} this.replace=replace;

function add(a, b)
{
 if (!b) return a;
 var key;
 for (key in b)
  if(typeof a[key] === 'undefined' ||  a[key]===null)
   a[key] = b[key];
 return a;
} this.add=add;


function extend(a, b, context) // context is anti circular references mechanism
{
 if (!b) return a;

 var key, clean_context=false;
 if(!context){clean_context;context=[];}
 if( context.indexOf(b)==-1 ) context.push(b); else return b;

 for (key in b)
 {
  if(typeof a[key] === 'undefined')
  {
   if(typeof b[key] === 'object')
   {
    if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
     a[key] = extend([], b[key],context);
    else if(b[key]===null)
     a[key] = null;
    else
     a[key] = extend({}, b[key],context);
   }
   else
     a[key] = b[key];
  }
  else if(typeof a[key] === 'object' && a[key] !== null)
    a[key] = extend(a[key], b[key],context);
  else  
    a[key] = b[key];
 }
 if(clean_context) context=null;
 return a;
} this.extend=extend;

function extenduptolevel(a, b, levels,context)
{
 if (!b) return a;

 var key, clean_context=false;
 if(!context){clean_context;context=[];}
 if( context.indexOf(b)==-1 ) context.push(b); else return b;
 
 for (key in b)
 {
  if(typeof a[key] === 'undefined')
  {
   if(typeof b[key] === 'object' && levels>0)
   {
    if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
     a[key] = extend([], b[key],levels-1,context);
    else if(b[key]===null)
     a[key] = null;
    else
     a[key] = extend({}, b[key],levels-1,context);
   }
   else
     a[key] = b[key];
  }
  else if(typeof a[key] === 'object' && a[key] !== null && levels>0)
    a[key] = extend(a[key], b[key],levels-1,context);
  else  
    a[key] = b[key];
 }
 if(clean_context) context=null;
 return a;
} this.extenduptolevel=extenduptolevel;

function clone(obj)
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) return null;
  if (obj instanceof Array ) return extend([], obj);
  return extend({}, obj);
 }
 return obj;
} this.clone=clone;

function cloneextend(obj,exteddata)
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) return null;
  return extend(clone(obj),exteddata);
 }
 return obj;
} this.cloneextend=cloneextend;


function cloneuptolevel(obj,level) // clone only numlevels levels other levels leave references
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) return null;
  if (obj instanceof Array ) return extenduptolevel([], obj,level);
  return extenduptolevel({}, obj,level);
 }
 return obj;
} this.cloneuptolevel=cloneuptolevel;

