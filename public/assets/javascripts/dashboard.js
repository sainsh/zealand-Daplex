
/* Script for dashboard client side */

//Select HTML Elements
let pop1 = document.getElementById('pop-out1');
let pop2Energy = document.getElementById('pop-out2-energy');
let pop2Condition = document.getElementById('pop-out2-condition');
let pop2Helpdesk = document.getElementById('pop-out2-helpdesk');
let pop3 = document.getElementById('pop-out3');

var superList = document.getElementById("super-list");
var buildingList = document.getElementById("building-list");
var energyCategoryList = document.getElementById("category-list-energy");
var conditionCategoryList = document.getElementById("category-list-condition");
var helpdeskCategoryList = document.getElementById("category-list-helpdesk");

let superLiItems = superList.getElementsByTagName("li");
let buildingLiItems = buildingList.getElementsByTagName("li");
let energyCategoryLiItems = energyCategoryList.getElementsByTagName("li");
let conditionCategoryLiItems = conditionCategoryList.getElementsByTagName("li");
let helpdeskCategoryLiItems = helpdeskCategoryList.getElementsByTagName("li");

let optionsSelected = [0, 0, 0];


/* function called on page update or menu click */
window.onhashchange = function () {
    //code  

    // getting slider and slider label
    let weightslidertext = this.document.getElementById('weightslider');
    let slider = this.document.getElementById('myRange');

    //writing slider value to slider label on slider value change 
    slider.addEventListener('change', () => {
        weightslidertext.innerText = 'Vægtning = ' + slider.value;
    })
        // showing popout view if menu item is selected
        this.document.getElementById('pop-out').style.display = 'block';
        // getting header text from popout view
        let headertext = this.document.getElementById('pop-out-header');

        // getting different selectboxes for different menu categories in array 
        let selectBoxes = [this.document.getElementById('helpdesk-category'), this.document.getElementById('condition-category'), this.document.getElementById('energy-category')];

        //show property type select box
        this.document.getElementById('property-types').style.display = 'block';

        //Setting propertytypes to Global option everytime category changes
        this.document.getElementById('property-types').selectedIndex = "0";

}

/* handle save button click and submit form to the right method and url */
saveInputData = () => {


        let yellow = document.getElementById('thresholdYellow').value;
        let red = document.getElementById('thresholdRed').value;
        let weight = document.getElementById('myRange').value;

    var http = new XMLHttpRequest();
    http.open('POST', '/dashboard/save');
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = () =>{
        console.log(http.responseText)
    };
    http.send(JSON.stringify({"category": `${optionsSelected[0]}`, "property_type" : `${optionsSelected[1]}`,
        "category_option": `${optionsSelected[2]}`, "threshold_yellow" : `${yellow}`, "threshold_red" : `${red}`, "weight" : `${weight}`}));

};

initEventListeners = () =>{
    superList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        optionsSelected = [clickedIndex, 0, 0];
        setActive(superLiItems, clickedIndex);

        clearListActive(energyCategoryLiItems);clearListActive(conditionCategoryLiItems);clearListActive(helpdeskCategoryLiItems);
        clearListActive(buildingLiItems);
        pop1.style.display = "block";
        pop2Energy.style.display = "none";pop2Condition.style.display = "none";pop2Helpdesk.style.display = "none";
        pop3.style.display = "block";
        pop3.style.left = "700px";

        fetchData();
    });

    buildingList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        optionsSelected[1] = parseInt(clickedIndex) + 1;
        optionsSelected[2] = 0;
        setActive(buildingLiItems, clickedIndex);
        if (optionsSelected[0] == 0) {
            pop2Energy.style.display = "block";
            pop2Condition.style.display = "none";
            pop2Helpdesk.style.display = "none";
            clearListActive(energyCategoryLiItems);
        }else if(optionsSelected[0] == 1) {
            pop2Energy.style.display = "none";
            pop2Condition.style.display = "block";
            pop2Helpdesk.style.display = "none";
            clearListActive(conditionCategoryLiItems);
        }else if(optionsSelected[0] == 2) {
            pop2Energy.style.display = "none";
            pop2Condition.style.display = "none";
            pop2Helpdesk.style.display = "block";
            clearListActive(helpdeskCategoryLiItems);
        }

        pop3.style.left = "1050px";

        fetchData();
    });

    energyCategoryList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        optionsSelected[2] = parseInt(clickedIndex) + 1;
        setActive(energyCategoryLiItems, clickedIndex);
        fetchData();
    });
    conditionCategoryList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        optionsSelected[2] = parseInt(clickedIndex) + 1;
        setActive(conditionCategoryLiItems, clickedIndex);
        fetchData();
    });
    helpdeskCategoryList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        optionsSelected[2] = parseInt(clickedIndex) + 1;
        setActive(helpdeskCategoryLiItems, clickedIndex);
        fetchData();
    });
};

setActive = (liList, index) =>{
    clearListActive(liList);
    liList[index].classList.add("active");
}



clearListActive = (list) =>{
    for (let i = 0; i < list.length; i++){
        list[i].classList.remove("active");
    }
};

fetchData = () =>{
    var http = new XMLHttpRequest();
    http.open('POST', '/dashboard/getData');
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = () =>{
        console.log(http.responseText)
        let response = JSON.parse(http.responseText);
        populateForm(response.yellow, response.red, response.weight);
    };
    http.send(JSON.stringify({"category": `${optionsSelected[0]}`, "property_type" : `${optionsSelected[1]}`,
        "category_option": `${optionsSelected[2]}`}));
};

populateForm = (y, r, s) =>{
    let yellow = document.getElementById("thresholdYellow");
    let red = document.getElementById("thresholdRed");
    let slider = document.getElementById("myRange");

    if(y >= 0){
        yellow.value = y
    }
    if(r >= 0){
        red.value = r;
    }
    if(s >= 0){
        slider.value = s;
        this.document.getElementById('weightslider').innerHTML = `Vægtning = ${s}`;

    }

}

initEventListeners();
// calling method on page load and page reload
window.onhashchange();






