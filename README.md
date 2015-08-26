
# Demers Cartogram Example
Simple example of a demers cartogram in JavaScript using d3.js and jQuery.
![World-Map](https://raw.githubusercontent.com/StudioV2/Demers_Cartogram_Example/master/world-map.png)


## 

## What this project do ?

This project provides a representation of data on a map as squares. The squares are proportionals to their value. It bring out the data, regardless the size of the country.
	

## Informations

This project use [Jquery](https://jquery.com/) and [d3.js](http://d3js.org/).

The data used are fictive, they were created juste for this exemple.

## How to install ?

### Requirements

This cartogram works directly with Firefox.

For the others browser you need a local server like Mamp (Mac) or Wamp (Windows).

The raison is the json cannot be load by Safari, Chrome, etc.. without a local server.

### Install

Just clone [this repository](https://github.com/StudioV2/Demers_Cartogram_Example) on your desktop and run **index.html** with you browser.

### Configuration

For a simple use of the cartogram, you can found 4 options in **index.html** 

```javascript
	// The maximum value among your centroid
	var maxValue = 16.5;
```

```javascript
	// Rato size of the squares in relation to the card size.
	// Let this default value to 500 to start.
	var ratio = 500;
```

```javascript		
	// This value is here for 2 things
	// 1) Value for change of a few square position.
	// 2) If the display position of the squares are great but it explode at the end,
	// change the value by adding/removing 1 or more
	// Let this default value to 114 to start.
	var scale = 114; 
```

```javascript
	// Function for define the color of the squares,
	// in relation of his interval
	function getColorFromValue(value) {
    	if (value > 10) {
        	return "#B12535";
	    } else if (value > 5) {
	        return "#D76D43";
	    } else if (value > 0) {
	        return "#EFC46E";
	    } else {
	        return "#ECECED";
	    }
    }
```


