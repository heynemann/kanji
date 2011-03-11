
# kanji - template engine

kanji is a template engine heavily influenced by
[jinja2](http://jinja.pocoo.org/) and implemented with JavaScript for [node](http://nodejs.org).

The code design and structure is heavily influenced by the amazing
[jade](http://jade-lang.com/) template language.

## Features

  - Template parsing;

## Installation

via npm:

    npm install kanji (not yet available)

## Public API

    var kanji = require('kanji');

    // Render a string
    kanji.render('string of kanji');
    // Returns "string of kanji"

### Options

 - `debug`     Outputs tokens and function body generated

## Syntax

TBW.

## License 

(The MIT License)

Copyright (c) 2011 Bernardo Heynemann &lt;heynemann@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
