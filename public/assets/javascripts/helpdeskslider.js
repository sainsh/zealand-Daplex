var select = document.getElementById("select");

function createSliderLogic(nameBullet, nameSlider, value){
var bullet = document.getElementById(nameBullet);
var slider = document.getElementById(nameSlider);
bullet.value = value;
slider.value = value;

slider.addEventListener("input", ()=>{
    bullet.innerHTML = slider.value;
    var bulletPosition = (slider.value/slider.max);

    bullet.style.left = (bulletPosition * 578) + "px";
}, false);
}

var req = new XMLHttpRequest();
req.open('POST', '/weightUI/helpdesk/sliders');
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.onload = () => {
    var sliderValues = JSON.parse(req.response);
    console.log(sliderValues[0]);


    createSliderLogic("indeBullet", "indeSlider", sliderValues[0]);
    createSliderLogic("udvBullet", "udvSlider", sliderValues[1]);
    createSliderLogic("murBullet", "murSlider", sliderValues[2]);
    createSliderLogic("tagBullet", "tagSlider", sliderValues[3]);
    createSliderLogic("udBullet", "udSlider", sliderValues[4]);
    createSliderLogic("tagDækBullet", "tagDækSlider", sliderValues[5]);
    createSliderLogic("tekBullet", "tekSlider", sliderValues[6]);
    createSliderLogic("tagrenBullet", "tagrenSlider", sliderValues[7]);
    createSliderLogic("funBullet", "funSlider", sliderValues[8]);
    createSliderLogic("vinBullet", "vinSlider", sliderValues[9]);
}
req.send(`id=${select.value}`);