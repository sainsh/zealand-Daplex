var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

var rangeSlider2 = document.getElementById("rs-range-line2");
var rangeBullet2 = document.getElementById("rs-bullet2");

var rangeSlider3 = document.getElementById("rs-range-line3");
var rangeBullet3 = document.getElementById("rs-bullet3");



if(rangeSlider){
rangeSlider.addEventListener("input", showSliderValue, false);}

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}

if(rangeSlider2){
    rangeSlider2.addEventListener("input", showSliderValue2, false);}
    
    function showSliderValue2() {
      rangeBullet2.innerHTML = rangeSlider2.value;
      var bulletPosition2 = (rangeSlider2.value /rangeSlider2.max);
      rangeBullet2.style.left = (bulletPosition2 * 578) + "px";
    }

if(rangeSlider3){
        rangeSlider3.addEventListener("input", showSliderValue3, false);}
        
        function showSliderValue3() {
          rangeBullet3.innerHTML = rangeSlider3.value;
          var bulletPosition3 = (rangeSlider3.value /rangeSlider3.max);
          rangeBullet3.style.left = (bulletPosition3 * 578) + "px";
        }