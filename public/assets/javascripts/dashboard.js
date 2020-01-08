
/* Script for dashboard client side */

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

    // getting url including # and after fx. www.example.com/dashboard#energy returns #energy
    let urlhash = window.location.hash;

    // checking if hash exits
    if (urlhash != '') {

        // showing popout view if menu item is selected
        this.document.getElementById('pop-out').style.display = 'block';
        // getting header text from popout view
        let headertext = this.document.getElementById('pop-out-header');

        // getting different selectboxes for different menu categories in array 
        let selectBoxes = [this.document.getElementById('helpdesk-category'), this.document.getElementById('condition-category'), this.document.getElementById('energy-category')];

        // if helpdesk category is chosen
        if (urlhash == "#helpdesk") {

            // changing popout header text and showing correct select box
            headertext.innerText = 'Helpdesk';

            selectBoxes[0].style.display = 'block';
            selectBoxes[1].style.display = 'none';
            selectBoxes[2].style.display = 'none';

            // if condition category is chosen
        } else if (urlhash == "#condition") {

            // changing popout header text and showing correct select box
            headertext.innerText = 'Tilstand';

            selectBoxes[0].style.display = 'none';
            selectBoxes[1].style.display = 'block';
            selectBoxes[2].style.display = 'none';

            // if energy category is chosen
        } else if (urlhash == "#energy") {

            // changing popout header text and showing correct select box
            headertext.innerText = 'Energi';

            selectBoxes[0].style.display = 'none';
            selectBoxes[1].style.display = 'none';
            selectBoxes[2].style.display = 'block';

        }

    }

}


// calling method on page load and page reload
window.onhashchange();






