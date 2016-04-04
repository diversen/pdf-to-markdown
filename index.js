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
} else {
    console.log('doh');
}

outputAll();


function outputAll() {
    console.log($('*').html());
}

// process.exit();
function processXML() {
    var log = new logger();
     
    $('image, text').each(function () {
        // console.log($(this).text());
        if ($(this).is("text")) {
            
            var linNume = $(this).attr('top') + ' ';
            log.text(linNume + $(this).text());
        }

        if ($(this).attr('src')) {
            log.img($(this).attr('src'));
        }
    });
    log.getOutput();
}

// Remove last text element
function removePageNumbers() {
    $('text:last-of-type').remove();
}

// Logger
function logger () {
    
    this.result = ''; 
    
    this.text = function (text, numLine) {
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
removePageNumbers();
// processXML();

