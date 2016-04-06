#!/usr/bin/env node

'use strict';

var exists = require('file-exists');
var read = require('read-file');
var isNumeric = require("isnumeric");
var removeNewline = require('newline-remove');
var program = require('commander');
var hash = require('./lib/hash');
var path = require('path');


program
  .usage('[options] <file>')
  .version('0.0.1')
  .option('-f, --file [file]', 'Specify XML file to parse')
  .option('-t, --title [name]', 'Specify name of top header1')
  .parse(process.argv);

// Check file, and read file
var file = program.file;

if (!exists(file)) {
    console.log('File does not exist');
    process.exit(1);
} else {
    var buffer = read.sync(file);
    var cheerio = require('cheerio'),
    $ = cheerio.load(buffer);
}

// Remove page number. Remove last text element if is numeric
function removePageNumbers() {
    $('text:last-of-type').each(function( index ) {
        if (isNumeric($( this ).text())) {
            ($( this ).remove());
        }
    });
}

// Add title chapter to outline
function addTitleChapter () {
        
    // Add first chapter to outline
    var title = program.title;
    if (title === undefined) {
        title = program.file;
        var ary = path.parse(title);
        title = ary['name'];
    }

    // First chapter and title
    $('item').first().each(function (index) {
        var page = $(this).attr('page');
        console.log(page);
    });
    
    $( "outline" ).prepend( "<item page='1'>" + title + "</item>" );
}

// Add chapters according to outline
function addChapters () {

    // Limitation. Only one chapter per page. 
    var begin = [];
    $('outline item').each(function( index ) {
         
        // Get title and page
        var title = $(this).text();
        title = removeNewline(title);
        var page = $(this).attr('page');
        
        // Only one chapter per page
        if ( begin.indexOf(page) === -1 ) {
            begin.push(page);
            $("page[number='" + page + "']").wrap('<div class ="chapter"></div>');
        }
        
        // console.log(title);
        // console.log(page);

    });
}

//addTitleChapter();
//addChapters();
// outputAll();
processXML();
// Process XML and save to buffer
function processXML() {
    var log = new logger();

    // Text image
    $('image, text').each(function () {
        
        if ($(this).is("text")) {
            
            var top =  $(this).attr('top');
            var left = $(this).attr('left');
            var text = $(this).text();

            log.text(text);
            
        }

        if ($(this).attr('src')) {
            log.img($(this).attr('src'));
        }
    });
    
    log.getOutput();
}

// Logger. Collects XML to Markdown
function logger () {
    
    this.result = ''; 
    
    this.lineNumber = 0;
    
    this.text = function (text) {
        text =  removeNewline(text);
        
        if (text.endsWith('-')) {
           // text = text.slice(-1); 
           text = text.replace(/-$/, '');
           this.result+= text;
        } else {
           this.result+= text + "\n";
        }
    };
    
    this.img = function (src) {    
        this.result+= "\n" + removeNewline(src) + "\n";
    };
    
    this.getOutput = function() {
        console.log(this.result);
    };
}

function outputAll() {
    console.log($('*').html());
}


