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



$('input[type="range"]').change(function(e){

  // reset so we dont do multiple directions
  // but only if its a manually triggered change
  if (e.srcElement && !wackyMode){
    [].forEach.call( document.querySelectorAll('input[type="range"]') , function(slider, i){
      if (slider == e.target) return;
      slider.value = 0;
    });
  }


  direction = e.target.id.replace('len','');

  length = e.target.value;
  //debugger;
  doIt(e);

});


// color
function changeColor(e){
  color = e.target.value;
  doIt(e);
};

var elColor = document.querySelector('input[type="color"]');
$(elColor).bind('blur focus', changeColor);

document.querySelector('input[type="checkbox"]').addEventListener('change', function(e){
  wackyMode = e.target.checked;
}, false);

$('button:first').click(function f(e){
   f.on = !f.on;
   e.target.innerHTML = f.on ? 'what does it mean?' : 'all the way';
   RAINBOWZ(f.on);
});

$('button:last').click(function f(e){
   f.on = !f.on;
   e.target.innerHTML = f.on ? 'nvm.' : '3D';
   threeD(f.on);
});


function doIt(e){

  h1.style.textShadow = '';
  string = '';

  offset = directionMap[direction];

  var sliders = document.querySelectorAll('input[id^="len"]');


  if ((e && !e.srcElement) || wackyMode){
    for (var j = 0; j < sliders.length; j++){

      offset = directionMap[sliders[j].id.replace('len','')];
      var value = sliders[j].value;

      for (var i = -1; ++i < value; ){
       string += color +  ' ' + (i+1) * offset.x + 'px ' + (i+1) * offset.y + 'px, ';
      }
    }
  } else {
    for (var i = -1; ++i < length; ){
     string += color +  ' ' + (i+1) * offset.x + 'px ' + (i+1) * offset.y + 'px, ';
    }
  }


  string = string.slice(0,string.length-2);

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
        hue = Math.round( normI * 360 * 6 * 10 ) / 10 ,
        x = parseInt( Math.sin( normI * Math.PI * 2 * 2 )  * 60 );

    shadows += ', ' + x + 'px ' + i + 'px hsl(' + hue + ', 100%, 50%)'
  }

  setShadow(shadows)
};


// thx http://markdotto.com/playground/3d-text/
var threeD = function(bool){

  if (!bool) {
    doIt();
    return;
  }
  var shadows = '0 1px 0 #ccc, \
0 2px 0 #c9c9c9, \
0 3px 0 #bbb, \
0 4px 0 #b9b9b9, \
0 5px 0 #aaa, \
0 6px 1px rgba(0,0,0,.1), \
0 0 5px rgba(0,0,0,.1), \
0 1px 3px rgba(0,0,0,.3), \
0 3px 5px rgba(0,0,0,.2), \
0 5px 10px rgba(0,0,0,.25), \
0 10px 10px rgba(0,0,0,.2), \
0 20px 20px rgba(0,0,0,.15)';

  setShadow(shadows);
}


$('.presets a').click(function(){

  var name = window.prompt('what you wanna call it, bro?');

  var obj = {};
  $('input').each(function(i, elem){
    obj[elem.name] = elem.value
  });

  var presets = JSON.parse(localStorage.getItem('mypresets')) || {};
  presets[name] = obj;

  localStorage.setItem('mypresets', JSON.stringify(presets));

  buildPresets();

  return false;
});



applyPreset = function(preset){

  preset = JSON.parse(preset);

  $('input').each(function(i, elem){

    elem.value = preset[elem.name];

  }).change().blur();


};



buildPresets = function(){

  $('ol').empty();

  var mypresets = JSON.parse(localStorage.getItem('mypresets'));

  $.each(mypresets, function(name, preset){



    $('<a>',{
      text          : name,
      "data-preset" : JSON.stringify(preset),
      href          : '#',
      click         : function(){
        applyPreset( $(this).attr('data-preset')  );
        return false;
      }
    }).wrap('<li>').parent().appendTo('ol');



  });



}

$(function(){

  if (!Modernizr.localstorage){
    $('.presetwrap').remove();
    return;
  }


  buildPresets();
})






















