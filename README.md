# Node.js Clone Extend

* It is what you ware searching for...
* It allows you to merge and clone javascript objects easyly.
* It supports cyclic references.

## include it!
    require.paths.unshift(__dirname); //make local paths accessible

    // just make it as maybe it is like underline or a short variable name for it;
    var _ = require('merger');  
    var a={x:1,w:{h:1}};
    var b={x:2,y:{z:'Shimon Doodkin',},w:{v:3},deepone:{f:{o:2}}};
    var c;

## replace

    // function replace(a, b)
    //  for (key in b) a[key] = b[key];
    a=_.replace(a,b);
    // a={x:2,y:ref{z:'Shimon Doodkin',},w:ref{v:3},deepone:{f:{o:2}},};

## add
    // function add(a, b)
    //  for (key in b)
    //   if(typeof a[key] === 'undefined' || a[key]===null)
    //     a[key] = b[key];

a=_.add(a,b);
// a={x:1,y:ref{z:'Shimon Doodkin',},w:{h:1},deepone:{f:{o:2}},};

## extend
this function merges second object in to the first and returns the fitst object (objects are always reference)

    // function extend(a, b)
    a=_.extend(a,b);
    // a={x:2,y:ref{z:'Shimon Doodkin',},w:{h:1,v:3},deepone:{f:{o:2}},};

## extenduptolevel

    // function extenduptolevel(a, b, levels)
    a=_.extenduptolevel(a,b,2);
    // a={x:2,y:ref{z:'Shimon Doodkin',},w:{h:1,v:3},deepone:new{f:ref{o:2}},};
    a.deepone.somenew=1;
    b.deepone.othernew=2;
    // a={x:2,y:ref{z:'Shimon Doodkin',},w:{h:1,v:3},deepone:new{f:ref{o:2},somenew:1},};
    // b={x:2,y:ref{z:'Shimon Doodkin',},w:{h:1,v:3},deepone:new{f:ref{o:2},othernew:2},};

##  clone
    // function clone(obj)
    //   extend({}, obj);
    c=clone(a);
    a.somenew=1;
    c.othernew=2;
    // a={x:1,w:{h:1},somenew:1,};
    // c=new{x:1,w:new{h:1},othernew:2,};

## cloneextend

    // function cloneextend(obj,exteddata)
    //   extend(clone(obj),exteddata);
    c=cloneextend(a,{othernew:2,});
    // c=new{x:1,w:new{h:1},othernew:2,};

## cloneuptolevel

    // // clone only numlevels levels other levels leave references
    // function cloneuptolevel(obj,level)
    //   extenduptolevel({}, obj, levels)
    c=_.extenduptolevel(a,{deepone:{othernew:2}},2);
    // c={x:2,y:ref{z:'Shimon Doodkin',},w{h:1,v:3},deepone:new{f:new{o:2},othernew:2},};
 
