var assert = require("assert");

//var ce=require('cloneextend')
var ce=require('./index');

describe('extend', function(){
    it('clone plain objects well', function(){
	    var a={a:1,b:2,c:{d:3}}
		var b={};
		ce.extend(b,a)
        assert.deepEqual(a, b);
    });
	
    it('clone custom objects well', function(){
	    function MyObject()
		{
			this.someproperty={};
		}
		
		ce.howtoclone.MyObject= function(obj) {
			var cloned=new obj.constructor();
			//cloned.someproperty=obj.someproperty;
			ce.extend(cloned,obj);
			return cloned;
		}

	    var a={obj:new MyObject()};
			a.obj.someproperty={a:1,b:2,c:{d:3}};
		var b={};
		ce.extend(b,a)
		delete ce.howtoclone.MyObject;
        assert.deepEqual(a, b);
		assert.deepEqual(a.obj.someproperty.constructor.name, b.obj.someproperty.constructor.name);
    });

	
    it('cloneing custom undefined objects should throw an error', function(){
	    function MyObject()
		{
			this.someproperty={};
		}
		
	    var a={obj:new MyObject()};
			a.obj.someproperty={a:1,b:2,c:{d:3}};
		var b={};
		var catched=false;
		try{
		ce.extend(b,a)
		}catch(e){
			catched=true;
		}
		if(!catched)
			throw new Error('no was error cloning unknown custom objects')
    });
});
