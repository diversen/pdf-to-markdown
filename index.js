'use strict';

var exists = require('file-exists');
var read = require('read-file');
var isNumeric = require("isnumeric");
var removeNewline = require('newline-remove');
var program = require('commander');
var hash = require('./lib/hash');

program
  .usage('[options] <file>')
  .version('0.0.1')
  .option('--outline [type]', 'Fallback outline. Generates outline from list of internal links. Specify the number you will use [2]', parseInt)
  .parse(process.argv);

// Check file, and read file
var file = process.argv.slice(-1).pop();
if (!exists(file)) {
    console.log('File does not exist');
    process.exit(1);
} else {
    var buffer = read.sync(file, 'utf8');
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


// Try and add TOC without outline
function addTocNoOutline () {
    
    // Toc to any ahref which points to internal part of xml file
    $("a[href*=#]").parent().addClass('toc');
    
    // Add outline
    $( "pdf2xml" ).append( "<outline>Test</outline>" );
    
    // Select internal links
    $(".toc:nth-of-type(3n+1)").each(function() {
        
        // console.log($(this).html());
        console.log($(this).html());
        
        // <item page="34">Regionsrepr&#xE6;sentanter</item>
        // $( "<p>Test</p>" ).appendTo( "outline" );
        // // $( this ).addClass( "foo" );
    });
    
    console.log();
    
    $(".toc").each(function() {
        
        console.log($(this).html());
        // console.log($(this).html());
        
        // <item page="34">Regionsrepr&#xE6;sentanter</item>
        // $( "<p>Test</p>" ).appendTo( "outline" );
        // // $( this ).addClass( "foo" );
    });
    
    
}

function addToc (outline) {
    console.log(outline);
    if (!$('outline').length) {
        addTocNoOutline(outline); 
    }
}

// Check outline option
var outline = 2;
if (program.outline) {
    outline = program.outline;
} 

addToc(outline);

// console.log(program.outline);

// addToc();
// outputAll();

// Process XML and save to buffer
function processXML() {
    var log = new logger();

    // Text image
    $('image, text').each(function () {
        
        if ($(this).is("text")) {
            
            var top =  $(this).attr('top');
            var left = $(this).attr('left');
            var text = $(this).text();
            
            log.isTable(top, left);
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


