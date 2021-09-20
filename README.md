# landing_page

This project is meant to satisfy Udacity Web Developer Professional track requirements.

## Project Overview

This project consists of a single webpage. The webpage consists of multiple section with the ability to navigate easily between section using the dynamically-generated responsive interactive navigation bar.

## Code Breakdown

Here I will break down the code and explain how it works.

- First we have `addNavListItem` function:
```
// Takes a section and adds it to the navigation list
function addNavListItem (section) {
  const header = section.querySelector("h2").innerText;
  const navList = document.getElementById("nav_list");
  const newItem = document.createElement("li");
  newItem.innerText = header;
  navList.appendChild(newItem);
}
```

This takes a section, accesses its header and adds the header inner text to the navigation list

- `constructNavList()` is self explainatory:
```
// Loops through all sections in the documents and adds thier headers to the navigation list
function constructNavList () {
  const sections = document.querySelectorAll("section");
  for (let section of sections) {
    addNavListItem(section);
  }
}
```
- This function checks the visibilty of an element:
```
// Check if an element is visible in viewport
// multiple elements can be visible at the same time 
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
	// returns true if the element is fully or partially visible in the viewport
	return (rect.bottom >= 0 && rect.top - window.innerHeight <= 0);
}
```
Here is where things become complicated!
This diagram from [Element.getBoundingClientRect() documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) is essential to understand how it works!
![getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png)

So in order to know if an element is visible on screen, I used `getBoundingClientRect()`. The bottom property refers to the distance from the top of the viewport to the bottom of the element. So basically, checking `rect.bottom >= 0` means checking that your viewport is not below the bottom of the element which makes the element invisible.
This expression `rect.top - window.innerHeight <= 0` is basically checking that your viewport is not above the top of the element by an amount greater than the inner height of your browser, in this case you will be viewing a higher part of the webpage that this speciefic element will be invisible.
So this function checks if an element is fully or partially visible in the viewport, but we need to be more speciefic to know which element to highlight, and that's what the next function does.

- Calculate the viewed amount of an element in percentage.
```
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
```

