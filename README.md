# landing_page

This project is meant to satisfy Udacity Web Developer Professional track requirements.

## Project Description

This project consists of a single webpage. The webpage consists of multiple section with the ability to navigate easily between section using the dynamically-generated responsive interactive navigation bar.

## How to run

The project is not currently hosted online; but you can simply download the project files to your computer, and open `index.html` using a web browser (Chrome, Firefox, ...etc.).

## Technologies

This project is meant to be as simple and independent as possible. It does not depend on any libraries or frameworks. The languages used are:
- HTML
- CSS
- JavaScript

## Code Overview

Here I will explain some parts of the code that I think they need more explanation than what is provided through the comments.

- This function checks the visibility of an element:
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

So in order to know if an element is visible on screen, I used `getBoundingClientRect()`. The bottom property refers to the distance from the top of the viewport to the bottom of the element. So basically, checking `rect.bottom >= 0` means checking that your viewport is not below the bottom of the element, which makes the element invisible.
This expression `rect.top - window.innerHeight <= 0` is basically checking that your viewport is not above the top of the element by an amount greater than the inner height of your browser, in this case you will be viewing a higher part of the webpage that this specific element will be invisible.
So this function checks if an element is fully or partially visible in the viewport, but we need to be more specific to know which element to highlight, and that's what the next function does.

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
In order to explain how this function works, I created this simple diagram:
![viewport_diagram](https://user-images.githubusercontent.com/22101838/134018699-32203e59-044f-4486-bb48-cfe56145e829.png)

## A note about plagiarism

If you are currently taking Udacity Front-End Nanodegree and you are required to submit the same project, you are free to have a look at my project code to get inspiration and have a general idea about the project. But you are not allowed to copy any part of the code. You have to figure out how to write a code by yourself in order to maximize your learning.
