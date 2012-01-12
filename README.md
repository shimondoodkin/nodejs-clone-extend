# Installation

npm:

npm install cloneextend

manual:

cd node_modules
git clone git://github.com/shimondoodkin/nodejs-clone-extend.git
mv nodejs-clone-extend cloneextend

http://github.com/shimondoodkin/nodejs-clone-extend

# Node.js Clone Extend
 * It is what you ware searching for ... 
 * It allows you to merge and clone javascript objects easyly.
 * It supports circular references.

The story behind this module is that I was trying to use underscore.js 
library for cloning and extending objects but it did not worked as expected, 
nor any other workaround or solution, so I wrote clone and extend 
functions from ground up for everyone's benefit.

##  basic functionality:

    var ce = require('cloneextend');  
    var o1={a:'a',d:new Date(),n:1,ar:[1,2,3]};
    var o2=ce.clone(o1); //now o2 will hold a copy of o1
    console.log(o2);
    
## cool trics: DRY (don't repeat yourself):
It allow you to do simple object inheritance.

    require.paths.unshift(__dirname); //make local paths accessible
    var _ = require('cloneextend');
      
    var basic_col={type:'string',size:10,default_value:''};
    var basic_model={ name:'somename', cols:{},
                      init:function(){this.do_something();},
                      do_something:function() { console.log("something"); }
                    };
    
    var cars=_.cloneextend(basic_model,
    {
     name:'cars',
     cols:
     {
      color:_.clone(basic_col),
      speed:_.cloneextend(basic_col,{type:'number'})
     }
    }
    );
    
    var red_cars=_.cloneextend(cars,{
     do_something:function(){console.log("my color is "+this.cols.color.default_value);},
     cols:{color:{default_value:'red'}}
    });
    
    var blue_cars=_.cloneextend(red_cars,{
     cols:{color:{default_value:'blue'}}
    });
    
    cars.init();    
    red_cars.init();    
    blue_cars.init();    

output:
    something
    my color is red
    my color is blue


## include it!

    var _ = require('cloneextend');
      
    var obj1={apples:10};
    var obj2={bananas:20};
    _.extend(obj1,obj2); // merge called extend

    // obj1 = {apples:10,bananas:20}

## replace
    // function replace(a, b)
    //  for (key in b) a[key] = b[key];

    var _ = require('cloneextend');  
    var obj1={apples:10};
    var obj2={apples:20,bananas:20};
    _.replace(obj1,obj2);

    // obj1 = {apples:20,bananas:20}

## add - adds if not exists
 this function does not replace elements if they are exists

    // function add(a, b)
    //  for (key in b)
    //   if(typeof a[key] === 'undefined' || a[key]===null)
    //     a[key] = b[key];

    var _ = require('cloneextend');  
    var obj1={apples:10};
    var obj2={apples:20,bananas:20};
    _.replace(obj1,obj2);

    // obj1 = {apples:10,bananas:20}

## extend
 this function merges second object in to the first and returns
 the first object by reference (objects are always reference)
 it replaces elements if they are exists

    // function extend(a, b)
    
    var _ = require('cloneextend');  
    var basket1={ apples:[{taste:'sour'},{taste:'sweet'}], fruit:'appricot' };
    var basket2={ fruit:'orange', vegetable:'cucumber'};
    _.extend(basket2,basket1);
    
    // basket2 = { apples:[{taste:'sour'},{taste:'sweet'}], fruit:'appricot' , vegetable:'cucumber' }
    // apples    // added
    // fruit     // replaced
    // vegetable // stayed
    
## extenduptolevel - extend up to level
 this function clones elements and creates new parent objects when they are missing.
 after the level is reached it starts to repace objects insted of creating new parents and refilling them.

 it allows you to clone only the 1st level 
 and let the second level to be references.
 
 Rememberence trick:
 If you want to modify values after 2nd dot write 2 in the level
 
    // function extenduptolevel(a, b, levels)

    var _ = require('cloneextend');  
    var a_shared_car={color:'silver',windows:'manual'};
    var obj1={ has:{ car:a_shared_car    } };
    var obj2={ has:{ laptop : 'hp_laptop'  } }
    _.extenduptolevel(obj2,obj1,2);
    
    // obj2 = { has:{ laptop:'hp_laptop', car:a_shared_car } }
    // obj1 = { has:{ car:a_shared_car } }
    // So if i change she shared car it should shange the other two because they are references:
    a_shared_car.windows='electric';
    
    // obj2 = { has:{ laptop:'hp_laptop', car:{color:'silver',windows:'electric'} } }
    // obj1 = { has:{ car:{color:'silver',windows:'electric'} } }    

##  clone
    // function clone(obj)
    //   extend({}, obj);
    
    var _ = require('cloneextend');  
    var obj1={fruit:'apple'};
    var newobj1=_.clone(obj1);
    
    // obj1    = {fruit:'apple'}
    // newobj1 = {fruit:'apple'}

## cloneextend - clone and then extend
    // function cloneextend(obj,exteddata)
    //   extend(clone(obj),exteddata);
    
    var _ = require('cloneextend');  
    var salad_basic={fruit:'apple'};
    var new_salad_v1=_.cloneextend(salad_basic,{syrop:'maple syrop'});
    var new_salad_v2=_.cloneextend(salad_basic,{syrop:'chocolate syrop'});
    
    // new_salad_v1 = {fruit:'apple',syrop:'maple syrop'}
    // new_salad_v2 = {fruit:'apple',syrop:'chocolate syrop'}    

## cloneuptolevel - clone up to level

    // // clone only numlevels levels other levels leave references
    // function cloneuptolevel(obj,level)
    //   extenduptolevel({}, obj, levels)
    
    var _ = require('cloneextend');  
    var a_shared_car={color:'silver',windows:'manual'};
    var obj1={ has:{ car:a_shared_car    } };
    var obj2=_.cloneuptolevel(obj2,2);
    
    // obj1 = { has:{ car:a_shared_car } }
    // obj2 = { has:{ car:a_shared_car } }
    
    // Again if i change she shared car it should shange the other two because they are references:
    a_shared_car.windows='electric';
    
    // obj1 = { has:{ car:{color:'silver',windows:'electric'} } }    
    // obj2 = { has:{ laptop:'hp_laptop', car:{color:'silver',windows:'electric'} } }
    

    
    
