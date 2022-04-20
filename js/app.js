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

function AddingTransition(){
  //adding transition when clicking
  let navbar = document.getElementById('navbarList').querySelectorAll('li');
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
}
AddingTransition();


function addingActiveClass(section){
  const id =  section.getAttribute('id'); 
  console.log(id);
  //document.getElementById(id).classList.add("your-active-class");
  document.querySelector(`#${id}`).classList.add("your-active-class");

}

function removingActiveClass(section){
  const id = section.getAttribute('id');
  document.getElementById(id).classList.remove("your-active-class");
  //document.querySelector(`#${id}`).classList.remove("your-active-class");
}



/*function highlightOff(){
  let navbar = document.getElementById('navbarList').querySelectorAll('li');
  navbar.forEach((item) => {
    item.classList.remove('navbarclick');
  });
}*/
//function that making the 'your-active-class' active and making the circle around the sections  when sliding down and the section is in the viewport
function ActiveClass(){
  sections.forEach((sec) =>{
    let offset = sec.getBoundingClientRect();
    let offsetTop = offset.top;
    console.log(offsetTop);
    if(offsetTop <= 50 && offset.bottom >=50){
      addingActiveClass(sec);
    }

    /*else if(offsetTop > 50){
      highlightOff();
      removingActiveClass(sec);
    }*/

    else {
      removingActiveClass(sec);
    }
  });
}


document.addEventListener('scroll', ActiveClass);
document.addEventListener('scroll', () =>{
  let current = '';
  sections.forEach((sec)=>{
    let offset = sec.getBoundingClientRect();
    let offsetTop = offset.top;
    if(offsetTop <= 50 && offset.bottom >=50){
      current = sec.dataset.nav
    }
  });
  console.log(`this is the current section ${current}`);
  let navbar = document.getElementById('navbarList').querySelectorAll('li');
  navbar.forEach((item)=>{
    item.classList.remove('navbarclick');
    console.log(`anchor ${item.querySelector('a')}`);
    if (item.querySelector('a').text === current){
      console.log(`true it is ${current}`);
        item.classList.add('navbarclick');
      }
  });

});
