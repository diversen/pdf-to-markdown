
/*
function processXML () {
    var log = new logger();
    jsdom.env(
        buffer,
        function (err, window) {
            if (err) {
                console.log(err);
                process.exit();
            }
            
            var $ = require('jquery')(window);
            console.log($('html').html());
            process.exit();
            var numLine = 0;
            $('img, text').each(function(){
                // console.log($(this).text());
                if ($(this).is("text")) {
                    //log.text($(this).text(), numLine++);
                    // processText($(this).text());
                }

                if ($(this).attr('src')) {
                    //log.img($(this).attr('src'));
                }                                                                                                              
            });
            
            //log.getOutput();
            
        }
    );
}
*/