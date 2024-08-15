# GoogleFontLoader
A super simple Javascript library to load (a single or multiple) Google Font(s).
It will load the stylesheets for the font, then call `document.fonts.load`.

## Installation

Download `GoogleFontLoader.js` or its minified cousin `GoogleFontLoader.min.js` and place it on your server, somewhere within the document root. Then include it in your page like so:
```html
<script src="/path/to/dist/GoogleFontLoader.min.js"></script>
```

## Usage

Load Google Fonts like this:
```javascript
GoogleFontLoader
.load(ArrayOfFontFamilies)
.then(...)
.catch(...)
```

For example:


```javascript
// Just load the `Anton` font family:
GoogleFontLoader.
load(['Anton'])
.then(() => { console.log('Anton font family loaded successfully') }

// Load `Anton`, `Concert One`, `Passion One` and `Titan One` (these fonts all have just one style)
// Load `Passion One` in a single variant: 400 (regular)
// Load `Londrina Solid` in two variants: 400 (regular) and 900 (black)
GoogleFontLoader
.load(["Anton", "Concert One0", "Titan One", "Londrina Solid:400", "Londrina Solid:900"]);
.then(() => { console.log('Fonts loaded successfully') }

// Load the Roboto font family in all its 12 variants
GoogleFontsLoader.load(["Roboto:100", "Roboto:100i", "Roboto:300", "Roboto:300i", "Roboto:400", "Roboto:400i", "Roboto:500", "Roboto:500i", "Roboto:700", "Roboto:700i", "Roboto:900", "Roboto:900i"]
```


