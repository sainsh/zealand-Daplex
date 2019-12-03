
function createSliderLogic(nameBullet, nameSlider){
var bullet = document.getElementById(nameBullet);
var slider = document.getElementById(nameSlider);

slider.addEventListener("input", ()=>{
    bullet.innerHTML = slider.value;
    var bulletPosition = (slider.value/slider.max);

    bullet.style.left = (bulletPosition * 578) + "px";
}, false);
}

var req = new XMLHttpRequest();
req.open('GET', '/weightUI/helpdesk/sliders');
req.onload = () => {
    var sliderValues = req.response;
    console.log(sliderValues);


    createSliderLogic("indeBullet", "indeSlider");
    createSliderLogic("udvBullet", "udvSlider");
    createSliderLogic("murBullet", "murSlider");
    createSliderLogic("tagBullet", "tagSlider");
    createSliderLogic("udBullet", "udSlider");
    createSliderLogic("tagDækBullet", "tagDækSlider");
    createSliderLogic("tekBullet", "tekSlider");
    createSliderLogic("tagrenBullet", "tagrenSlider");
    createSliderLogic("funBullet", "funSlider");
    createSliderLogic("vinBullet", "vinSlider");
}
req.send();