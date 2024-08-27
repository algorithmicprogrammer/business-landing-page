/**
 * @file Creating the functionality for the scrolling of the navbar & "Scroll To Top" button
 * @author Algorithmic Programmer
 */

/**
 * @desc declaration of global variables
 * @type {HTMLElement} main
 * @type {HTMLElement} navBar
 * @type {HTMLElement} footer
 * @type {HTMLCollectionOf<HTMLElement>} [...sections]
 */
    const main = document.querySelector('main');
    const navBar = document.querySelector('.navbar-nav');
    const footer= document.querySelector('footer');
    const [...sections] = document.getElementsByTagName('section');


/**
 * @function createNavListElementHyperlink
 * @desc helper function to create list elements & their respective hyperlinks in the navigation menu
 * @param {HTMLElement} section
 * @type {HTMLElement} hyperlink
 * @returns {HTMLLIElement} listElement
 */
    const createNavListElementHyperlink = (section) => {
        const listElement = document.createElement('li');
        const hyperlink = document.createElement('a');
        hyperlink.textContent = section.id;
        hyperlink.setAttribute('href', `#${section.id}`)
        hyperlink.addEventListener('click', scrollToSection);
        listElement.appendChild(hyperlink);
        listElement.className = 'nav-item';
        hyperlink.className = 'nav-link';
        return listElement;
    }


/**
 * @function isVisible
 * @desc helper function to detect the element relative to the location in the viewport using .getBoundingClientRect()
 * @param {HTMLElement} section
 * @returns {boolean}
 */
    const isVisible = (section) => {
        const rect = section.getBoundingClientRect();
        return (
            rect.top >=0 &&
            rect.left>=0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

    }


/**
 * @function scrollToSection
 * @desc scroll to anchor ID using scrollIntoView event
 * @param {Event} event
 */
    const scrollToSection = (event) => {
        event.preventDefault();
        const sectionLink = event.target.getAttribute('href');
        const section = document.querySelector(sectionLink);
        section.scrollIntoView({ behavior: "smooth" });
    }


/**
 * @function dynamicNavBuilder
 * @desc dynamically building the navigation bar by adding list elements & respective links for each section
 * @param sections
 */
    const dynamicNavBuilder = (sections) => {
        const fragment = document.createDocumentFragment();
        sections.forEach((section) => {
            const navElement = createNavListElementHyperlink(section);
            fragment.appendChild(navElement);
        })
        navBar.appendChild(fragment);
    }
    dynamicNavBuilder(sections);


/**
 * @function buildScrollToTopButton
 * @desc builds the "Scroll to Top" button and adds it to the DOM
 * @param main
 * @param footer
 * @type {HTMLElement} to top
 */
    const buildScrollToTopButton = (main, footer) => {
        const up = document.createElement('button');
        up.className = 'btn btn-primary btn-xl text-uppercase up';
        up.innerText = 'Scroll To Top';
        main.insertBefore(up, footer);
    }
    buildScrollToTopButton(main, footer);


/**
 * @function addCSSActiveState
 * @desc set CSS class active state when the element is in the viewport
 * @param sections
 */
    const addCSSActiveState = (sections) => {
        sections.forEach((section, index) => {
            if (isVisible(section)) {
                section.classList.add('active-section');
            }
            else {
                section.classList.remove('active-section');
            }
        })
    }


/**
 * @function
 * @listens window#scroll
 * @desc upon scrolling, setting the CSS class active state to the section in the viewport
 */
    window.addEventListener('scroll', (e) => {
        addCSSActiveState(sections);
    });


/**
 * @type {HTMLElement} up
 * @function
 * @listens window#scroll
 * @desc hiding the "Scroll to Top Button" if the user is not scrolled down at least 500 pixels from the top of the page
 */
    const up = document.querySelector('.up');


    window.onscroll = () => {
         if(this.scrollY >= 500) {
             document.getElementsByClassName('up')[0].style.visibility='visible';
         }
         else {
             document.getElementsByClassName('up')[0].style.visibility='hidden';
         }
    }


/**
 * @function
 * @listens up#click
 * @desc scrolls to the top when the "Scroll to Top" button is clicked
 */
    up.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })


/**
 * @type {number} interval
 * @type {HTMLElement} navHeader
 * @function
 * @listens window#scroll
 * @desc hides fixed navigation bar while not scrolling by using setTimeout to check when the user is no longer scrolling
 */
    let interval = null;
    const navHeader = document.querySelector('.nav-header');

    window.addEventListener('scroll', function () {
        if (interval) {
            clearTimeout(interval);
            navHeader.style.visibility = 'visible';
        }
        interval = setTimeout(() => {
            navHeader.style.visibility = 'hidden';
        }, 1000);
    });


