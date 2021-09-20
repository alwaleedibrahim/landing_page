// Helper functions

// Return a list of all elements with the tag "section"
function getSectionsList () {
	const sectionsList = document.querySelectorAll("section");
	return sectionsList;
}

// Take a section as an argument and returns the text content of its header
function getSectionHeader(section) {
	const header = section.querySelector("h2").innerText;
	return header;
}

// Takes a section header and adds it to the navigation list
function addNavListItem (sectionHeader) {
	const navList = document.getElementById("nav_list");
	const newItem = document.createElement("li");
	newItem.innerText = sectionHeader;
	navList.appendChild(newItem);
}

// Loops through all sections in the documents and adds thier headers to the navigation list
function constructNavList () {
	const sections = getSectionsList();
	for (let section of sections) {
		const header = getSectionHeader(section);
		addNavListItem(header);
	}
}

// Check if an element is visible in viewport
// multiple elements can be visible at the same time 
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
	return (rect.bottom >= 0 && rect.top - window.innerHeight <= 0);
}

// Highlight section
function highlightSection () {
	const sections = document.querySelectorAll('section');
	for (let section of sections) {
		if (isInViewport(section)) {
			section.classList.add("highlighted");
		}
		else {
			section.classList.remove("highlighted");
		}
	}
}

// When DOM is ready construct the navigation list
document.addEventListener('DOMContentLoaded', constructNavList());

// Highlight 
document.addEventListener('scroll', function () {
	highlightSection ();
});

// when item is clicked in nav list move to its section
const navItems = document.querySelector("#nav_list").children;
for (let i=0; i<navItems.length; i++) {
	navItems[i].addEventListener('click', 
		function () {
			// Select section by ID using the its order in navigation list
			const section = document.querySelector("#section" + (i+1));
			// Scroll to this section
			section.scrollIntoView();
			// Scroll up a little for better visibility
			window.scrollBy(0, -50);
		}
	)
}