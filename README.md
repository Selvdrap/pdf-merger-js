# Description

This node.js library can **merge mulible PDF documents**, or parts of them, to one new PDF document. It's only dependency is the [pdfjs](https://www.npmjs.com/package/pdfjs) so it can run in any javascript-only environement.

This library is inspired by the [PHP library PDFMerger](https://github.com/myokyawhtun/PDFMerger) and has therefore a very similay API.

## Installation

`npm install --save pdf-merger-trvl`

## Code sample

```javascript
const PDFMerger = require('pdf-merger-trvl');

var merger = new PDFMerger();

merger.add('pdf1.pdf');  //merge all pages. parameter is the path to file and filename.
merger.add('pdf2.pdf', [2]); // merge only page 2
merger.add('pdf3.pdf', '1to2'); //merge pages 1 to 2
merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3

merger.save('merged.pdf'); //save under given name

```

## Similar libraries

* [pdf-merge](https://www.npmjs.com/package/pdf-merge) has a dependency on [pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/).
* [easy-pdf-merge](https://www.npmjs.com/package/easy-pdf-merge) has a dependency on the [Apache PDFBox® - A Java PDF Library](https://pdfbox.apache.org/).
* [pdfmerge](https://www.npmjs.com/package/pdfmerge) has a dependency on python and [PyPDF2](https://pythonhosted.org/PyPDF2/).
