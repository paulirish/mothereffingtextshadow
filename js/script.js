/* Author: 
  ME, MOTHERFUCKER.

*/


var h1 = document.querySelector('h1');


// tell unsupporting browsers to FUCK OFF
if (!'textShadow' in document.body.style){
  document.querySelector('fieldset').style.display = 'none';
  document.querySelector('textarea').style.display = 'none';
  h1.style.marginTop = 0;
  h1.innerHTML = 'Your browser doesn\'t support text-shadow. <small style="font-size: 20px">It was even in CSS2.0!</small> Just terrible...';
}


// possible values 1 or -1
var offset = {
  x : 1,
  y : 1
}

var color = '#ffffff';

var length = 11;
var string = '';

var wackyMode = false;

var directionMap = {
  SE : { x: 1 , y: 1 },
  SW : { x: -1, y: 1 },
  NW : { x: -1, y: -1},
  NE : { x: 1 , y: -1}
};

var direction = 'SE';


[].forEach.call( document.querySelectorAll('input[type="range"]') , function(elem, i){

  elem.addEventListener('change',function(e){

    // reset so we dont do multiple directions
    if (!wackyMode){
      [].forEach.call( document.querySelectorAll('input[type="range"]') , function(slider, i){
        if (slider == elem) return;
        slider.value = 0;
      });
    }

    direction = elem.id.replace('len','');

    length = e.target.value;

    doIt();

  },false);

});


// color
function changeColor(e){
  color = e.target.value;
  doIt();
};

var elColor = document.querySelector('input[type="color"]');
elColor.addEventListener('blur', changeColor, false);
elColor.addEventListener('focus', changeColor, false);

document.querySelector('input[type="checkbox"]').addEventListener('change', function(e){
  wackyMode = e.target.checked;
}, false);

document.querySelector('button').addEventListener('click', function f(e){
   f.on = !f.on;
   e.target.innerHTML = f.on ? 'what does it mean?' : 'all the way';  
   RAINBOWZ(f.on);
}, false);

function doIt(){

  h1.style.textShadow = '';
  string = '';

  offset = directionMap[direction];

  var sliders = document.querySelectorAll('input[type="range"]');

  if (wackyMode){
    for (var j = 0; j < sliders.length; j++){

      offset = directionMap[sliders[j].id.replace('len','')];
      var value = sliders[j].value;

      for (var i = -1; ++i < value; ){
       string += color +  ' ' + (i+1) * offset.x + 'px ' + (i+1) * offset.y + 'px,';
      }
    }
  } else {
    for (var i = -1; ++i < length; ){
     string += color +  ' ' + (i+1) * offset.x + 'px ' + (i+1) * offset.y + 'px,';
    }
  }


  string = string.slice(0,string.length-1);

  setShadow(string);
}

doIt();


function setShadow(string){
  h1.style.textShadow = string;

  document.querySelector('textarea').value = 'text-shadow: ' + string + ';';
  
}


var RAINBOWZ = function(bool) {

  if (!bool) {
    doIt();
    return;
  }

  var maxCount = 400;
      shadows = '-1px -1px hsl(0,100%,50%)';

  for ( var i = 1; i < maxCount; i++ ) {
    var normI = i / maxCount,
        hue = normI * 360 * 6,
        x = parseInt( Math.sin( normI * Math.PI * 2 * 2 )  * 60 );

    shadows += ', ' + x + 'px ' + i + 'px hsl(' + hue + ', 100%, 50%)'
  }

  setShadow(shadows)
};




























