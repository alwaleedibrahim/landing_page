// Helper functions

// Return a list of all elements with the tag "section"
function getSectionsList () {
	let sectionsList = document.querySelectorAll("section");
	return sectionsList;
}

// Take a section as an argument and returns the text content of its header
function getSectionHeader(section) {
	let header = section.querySelector("h2").innerText;
	return header;
}

// Takes a section header and adds it to the navigation list
function addNavListItem (sectionHeader) {
	let navList = document.getElementById("nav_list");
	let newItem = document.createElement("li");
	newItem.innerText = sectionHeader;
	navList.appendChild(newItem);
}

// Loops through all sections in the documents and adds thier headers to the navigation list
function constructNavList () {
	let sections = getSectionsList();
	for (let section of sections) {
		let header = getSectionHeader(section);
		addNavListItem(header);
	}
}

// Highlight section
function highlightSection () {
	const sections = document.querySelectorAll('section');
	for (let section of sections) {
		let top = section.getBoundingClientRect().top;
		let height = section.getBoundingClientRect().height;
		if (top <= 0 && Math.abs(top) < height) {
			section.classList.add("highlighted");
		}
		else {
			section.classList.remove("highlighted");
		}
	}
}

// Events


// when section clicked in nav list move to its section



// when DOM is ready
document.addEventListener('DOMContentLoaded', constructNavList());

//scroll
document.addEventListener('scroll', function () {
	highlightSection ();
});




