//const db = require('../../../models/DatabaseTools');
var button = document.getElementById('btn');

function createSliderLogic(nameBullet, nameSlider){
var bullet = document.getElementById(nameBullet);
var slider = document.getElementById(nameSlider);

slider.addEventListener("input", ()=>{
    bullet.innerHTML = slider.value;
    var bulletPosition = (slider.value/slider.max);

    bullet.style.left = (bulletPosition * 578) + "px";
}, false);
}
function sendData() {
    var indeslider = document.getElementById('indeSlider').value;
    var udvSlider = document.getElementById('udvSlider').value;
    var murSlider = document.getElementById('murSlider').value;
    var tagSlider = document.getElementById('tagSlider').value;
    var udSlider = document.getElementById('udSlider').value;
    var tagDækSlider = document.getElementById('tagDækSlider').value;
    var tekSlider = document.getElementById('tekSlider').value;
    var tagrenSlider = document.getElementById('tagrenSlider').value;
    var funSlider = document.getElementById('funSlider').value;
    var vinSlider = document.getElementById('vinSlider').value;

    var data = [indeslider, udvSlider, murSlider, tagSlider, udSlider, tagDækSlider, tagrenSlider, vinSlider, funSlider, tekSlider];
    db.createHelpdeskWeightTable(data);
}

btn.addEventListener("click", sendData);



createSliderLogic("indeBullet","indeSlider");
createSliderLogic("udvBullet","udvSlider");
createSliderLogic("murBullet","murSlider");
createSliderLogic("tagBullet","tagSlider");
createSliderLogic("udBullet","udSlider");
createSliderLogic("tagDækBullet","tagDækSlider");
createSliderLogic("tekBullet","tekSlider");
createSliderLogic("tagrenBullet","tagrenSlider");
createSliderLogic("funBullet","funSlider");
createSliderLogic("vinBullet","vinSlider");
