


function createSliderLogic(nameBullet, nameSlider){
var bullet = document.getElementById(nameBullet);
var slider = document.getElementById(nameSlider);

slider.addEventListener("input", ()=>{
    bullet.innerHTML = slider.value;
    var bulletPosition = (slider.value/slider.max);

    bullet.style.left = (bulletPosition * 578) + "px";
}, false);
}





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
