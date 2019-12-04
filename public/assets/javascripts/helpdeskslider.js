var select = document.getElementById("select");

function createSliderLogic(nameBullet, nameSlider){
var bullet = document.getElementById(nameBullet);
var slider = document.getElementById(nameSlider);

slider.addEventListener("input", ()=>{
    bullet.innerHTML = slider.value;
    var bulletPosition = (slider.value/slider.max);

    bullet.style.left = (bulletPosition * 578) + "px";
}, false);
}

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

/*var req = new XMLHttpRequest();
req.open('POST', '/weightUI/helpdesk/sliders');
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.onload = () => {
    var sliderValues = JSON.parse(req.response);
    console.log(sliderValues[0]);
}
req.send(`id=${select.value}`);*/