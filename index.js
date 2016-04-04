'use strict';

var exists = require('file-exists');
var read = require('read-file');
var isNumeric = require("isnumeric");
var removeNewline = require('newline-remove');
var program = require('commander');

program
  .usage('[options] <file>')
  .version('0.0.1')
  .option('--rp', 'Remove Page numbers')
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

if (program.rp) {
    removePageNumbers();
}

function outputAll() {
    console.log($('*').html());
}


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

// Remove last text element if is numeric
function removePageNumbers() {
    $('text:last-of-type').each(function( index ) {
        if (isNumeric($( this ).text())) {
            ($( this ).remove());
        }
    });
}

function setTableTags () {
    
    this.valBuffer = new Array;
    
    this.last;

    
    this.setBuffer = function () {
    

        // Text
        $('text').each(function () {

            var top = $(this).attr('top');
            var left = $(this).attr('left');
            var text = $(this).text();
            
            var obj = ['test'];

            this.valBuffer.push('test');

            // log.isTable(top, left);
            // log.text(text);

        });

        for (var key in this.buffer) {
            console.log(key, this.buffer[key]);
        }
    };
}

var t = new setTableTags();
t.setBuffer();

// Logger
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


