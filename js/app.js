// Helper functions

// Takes a section and adds it to the navigation list
function addNavListItem (section) {
	const header = section.querySelector("h2").innerText;
	const navList = document.getElementById("nav_list");
	const newItem = document.createElement("li");
	newItem.innerText = header;
	navList.appendChild(newItem);
}

// Loops through all sections in the documents and adds thier headers to the navigation list
function constructNavList () {
	const sections = document.querySelectorAll("section");
	for (let section of sections) {
		addNavListItem(section);
	}
}

// Check if an element is visible in viewport
// multiple elements can be visible at the same time 
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
	// returns true if the element is fully or partially visible in the viewport
	return (rect.bottom >= 0 && rect.top - window.innerHeight <= 0);
}

// Calculate the viewed amount of an element in percentage
function amountOfView (element) {
	if (isInViewport(element)) {
		const rect = element.getBoundingClientRect();
		// Calculate the amount using element bottom if the lower part is the visible part
		if (rect.bottom <= rect.height) {
			return Math.round(rect.bottom/rect.height*100);
		}
		// Calculate the amount using element top if the viewport is above the element top
		else {
			return Math.round((window.innerHeight - rect.top)/rect.height*100);
		}
	}
	else {
		return 0;
	}
}

// Highlight section
function highlightSection () {
	// A variable to store the amount of view of an element
	let view = 0;
	// A variable to store the index of the section to be highlighted
	let highIndex = 0;
	const sections = document.querySelectorAll('section');
	const nav = document.querySelector("#nav_list");
	for (let i=0; i < sections.length; i++) {
		// Remove highlight if present from previous function call
		sections[i].classList.remove("highlighted");
		nav.children[i].classList.remove("active");
		if (amountOfView(sections[i])>view) {
			view = amountOfView(sections[i]);
			highIndex = i;
		}
	}
	sections[highIndex].classList.add("highlighted");
	
	// Highlight its corresponding navlist item
	nav.children[highIndex].classList.add("active");
}

// Scroll to section with smooth behavior
function scrollToSection (element) {
	element.scrollIntoView({behavior: "smooth", block: "start"});
}

// Events
// When DOM is ready construct the navigation list
document.addEventListener('DOMContentLoaded', constructNavList());

// Highlight sections when scrolling 
document.addEventListener('scroll', function () {
	highlightSection ();
});

// when item is clicked in nav list move to its section
const navItems = document.querySelector("#nav_list").children;
for (let i=0; i<navItems.length; i++) {
	// Select section by ID using the its order in navigation list
	let section = document.querySelector("#section" + (i+1));
	navItems[i].addEventListener('click', function () {
		scrollToSection(section);
	});
}
