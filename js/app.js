/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
//to ensure that the document.queryselectorAll returns array to make loop on it
 const sections = Array.from(document.querySelectorAll('section'));
 //const sections = [...document.querySelectorAll('section'))];
 //const sections = document.getElementaByTagName('section');
 const navbarUl = document.getElementById('navbarList');
 console.log(navbarUl);
 //const navbarUl = document.querySelector("#navbaList");
 //to reduce reflow and repaint
 const fragment = document.createDocumentFragment();
 //const fragment = new DocumentFragment();
 let navList = '';
 let id_increment = 1;
 /**
  * End Global Variables
  * Start Helper Functions
  
  *
  */


 // Create navbar function to generate the lists and anchors
function gernerateNavbar() {
    //for(const section of sections){}
    //for(let i = 1; i<= sections.length -1; i++){}
    sections.forEach((section) => {
      // add html tags for list items
      // dataset.nav returns DOMStringMap {nav: section 1}
      navList += `<li id="s${id_increment}"><a id="myLink" class="menuLink" href="#${section.id}" style="text-decoration: none;">${section.dataset.nav}</a></li>`;
            id_increment +=1;


      }); 
      const links = document.getElementsByClassName("menuLink");
      let index_increment = 0;
      console.log(links);
      navbarUl.innerHTML = navList;  
      //adding smooth and Scroll to anchor ID using scrollTO event
    sections.forEach((section) => {
      links[index_increment].addEventListener("click", (e) =>{
        e.preventDefault();
        section.scrollIntoView({
          behavior:"smooth",
        });
      });
      console.log(links);
      console.log(links[index_increment]);
      index_increment +=1;
    });
}
  gernerateNavbar();

  //adding transition when clicking
  let navbar = document.getElementById('navbarList').querySelectorAll('a');
  console.log(navbar);
// itrate in navbar items list
navbar.forEach((item) => {
  item.addEventListener('click', function (e) {
    navbar.forEach((item) => {
      // remove every navbarclick class added before in any list item
      item.classList.remove('navbarclick');
    });
    // add the class on the button
    item.classList.add('navbarclick');
  });
});



function addingActiveClass(section){


  const id =  section.getAttribute('id'); 
  //document.getElementById(id).classList.add("your-active-class");
  document.querySelector(`#${id}`).classList.add("your-active-class");

}

function removingActiveClass(section){
  const id = section.getAttribute('id');
  document.getElementById(id).classList.remove("your-active-class");
  //document.querySelector(`#${id}`).classList.remove("your-active-class");
}

//function that making the 'your-active-class' active and making the circle around the sections  when sliding down and the section is in the viewport
function ActiveClass(){

  sections.forEach((sec) =>{

    let offset = sec.getBoundingClientRect();
    console.log(offset.top);
    if(offset.top <= 150 && offset.bottom >=150){
      addingActiveClass(sec);
    }

    else{
      removingActiveClass(sec);
    }
  });


}

document.addEventListener('scroll', ActiveClass);


