'use strict';

var read = require('read-file');
var isNumeric = require("isnumeric");
var removeNewline = require('newline-remove');
var buffer = read.sync('test.xml', 'utf8');
var cheerio = require('cheerio'),
    $ = cheerio.load(buffer);
    

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
    }
    
    this.getOutput = function() {
        console.log(this.result);
    }
}

processXML();

