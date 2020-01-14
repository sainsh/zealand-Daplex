
/* Script for dashboard client side */

//Select HTML Elements
let pop1 = document.getElementById('pop-out1');
let pop2 = document.getElementById('pop-out2');
let pop3 = document.getElementById('pop-out3');

var superList = document.getElementById("super-list");
var buildingList = document.getElementById("building-list");
var categoryList = document.getElementById("category-list");

let superLiItems = superList.getElementsByTagName("li");
let buildingLiItems = buildingList.getElementsByTagName("li");
let categoryLiItems = categoryList.getElementsByTagName("li");

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

    // getting url including # and after. fx. www.example.com/dashboard#energy returns #energy
    let urlhash = window.location.hash;


    // checking if hash exits
    if (urlhash != '') {

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

        // if helpdesk category is chosen
        if (urlhash == "#helpdesk") {
            // changing popout header text and showing correct select box
            headertext.innerText = 'Helpdesk';

            selectBoxes[0].style.display = 'block';
            selectBoxes[1].style.display = 'none';
            selectBoxes[2].style.display = 'none';

            //Setting select to default option in case it was changed earlier
            this.document.getElementById('helpdesk-category').selectedIndex = "0";

            // if condition category is chosen
        } else if (urlhash == "#condition") {

            // changing popout header text and showing correct select box
            headertext.innerText = 'Tilstand';

            selectBoxes[0].style.display = 'none';
            selectBoxes[1].style.display = 'block';
            selectBoxes[2].style.display = 'none';

            //Setting select to default option in case it was changed earlier
            this.document.getElementById('condition-category').selectedIndex = "0";

            // if energy category is chosen
        } else if (urlhash == "#energy") {

            // changing popout header text and showing correct select box
            headertext.innerText = 'Energi';

            selectBoxes[0].style.display = 'none';
            selectBoxes[1].style.display = 'none';
            selectBoxes[2].style.display = 'block';

            //Setting select to default option in case it was changed earlier
            this.document.getElementById('energy-category').selectedIndex = "0";

        }

    }

}

/* handle save button click and submit form to the right method and url */
saveInputData = () => {

    console.log('function called');

    // getting url including # and after fx. www.example.com/dashboard#energy returns #energy
    let urlhash = window.location.hash;

    // getting the data from the form, only used for debugging
    let data = [document.getElementById('thresholdYellow').value, document.getElementById('thresholdRed').value, document.getElementById('myRange').value];

    // getting form document
    let submitForm = document.getElementById('submitForm');

    // loggin data for debugging
    console.log(data);

    // handle form submit (save button)
    // if hash is helpdesk
    if (urlhash == "#helpdesk") {

        console.log('helpdesk');

        // adding the category value to the data array
        data[3] = document.getElementById('helpdesk-category').value;

        // adding category value to the hidden form element
        document.getElementById('formCategory').value = data[3];

        console.log(data);

        // adding form attributes acording to url hash
        submitForm.setAttribute('method', "post");
        submitForm.setAttribute('action', "/dashboard/helpdesk");

        // returning true to continue the submitting of the form
        return true;

    } else if (urlhash == "#condition") {
        console.log('condition');

        // adding the category value to the data array
        data[3] = document.getElementById('condition-category').value;

        // adding category value to the hidden form element
        document.getElementById('formCategory').value = data[3];

        submitForm.setAttribute('method', "post");
        submitForm.setAttribute('action', "/dashboard/condition");

        return true;

    } else if (urlhash == "#energy") {
        console.log('energy');

        // adding the category value to the data array
        data[3] = document.getElementById('energy-category').value;

        // adding category value to the hidden form element
        document.getElementById('formCategory').value = data[3];

        submitForm.setAttribute('method', "post");
        submitForm.setAttribute('action', "/dashboard/energy");

        return true;

    }

    return false;

};

initEventListeners = () =>{
    superList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        setActive(superLiItems, clickedIndex);

        clearListActive(categoryLiItems);
        clearListActive(buildingLiItems);
        pop1.style.display = "block";
        pop2.style.display = "none";
        pop3.style.display = "block";
        pop3.style.left = "700px";
        var http = new XMLHttpRequest();
        http.open('POST', '/dashboard/getData');
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send(getBodyJson());
    });

    buildingList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        setActive(buildingLiItems, clickedIndex);

        clearListActive(categoryLiItems);
        pop2.style.display = "block";
        pop3.style.left = "1050px";
        var http = new XMLHttpRequest();
        http.open('POST', '/dashboard/getData');
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send(getBodyJson());
    });

    categoryList.addEventListener("click", (ev) =>{
        let clickedIndex = ev.target.attributes.value.value;
        setActive(categoryLiItems, clickedIndex);

        var http = new XMLHttpRequest();
        http.open('POST', '/dashboard/getData');
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send(getBodyJson());
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
}

getBodyJson = () =>{
    let urlhash = window.location.hash;

    let categoryOption = "";
    if(urlhash == "#helpdesk"){
        categoryOption = helpdesk.options[helpdesk.selectedIndex].value;
    } else if(urlhash == "#condition"){
        categoryOption = condition.options[condition.selectedIndex].value;
    } else if(urlhash == "#energy"){
        categoryOption = energy.options[energy.selectedIndex].value;
    }
    return JSON.stringify({"category": `${urlhash.substr(1)}`, "property_type" : `${property.options[property.selectedIndex].value}`, "category_option": `${categoryOption}`});
}

initEventListeners();
// calling method on page load and page reload
window.onhashchange();






