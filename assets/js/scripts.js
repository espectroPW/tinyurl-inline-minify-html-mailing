//inliner
var juice = require('juice');


var link_changed = 0;
var elements = 0;
var link_unique = 0;
var count_el = 0;
var list_changed_links = [];
var debounce = null;

$(document).ready(function() {


    $(".regex input#sub").click(function() {
        console.log("clicked");
        var output_element = '#output_url_text';
        $("textarea#regex").val('');
        $("textarea#output_url_text").val('');
        $(".stats").remove();
        replaceByNewUrl();

    });

});

function replaceByNewUrl() {

    var backup_string = $("textarea#url_to_change").val();

    $("#cache_html").html(inlineCss(backup_string));
    count_el = $("#cache_html").find("a").length;
    $("textarea#output_url_text").val(backup_string);

    $("textarea#url_to_change").before("<h3 class='stats'>Wykryto linków: (" + elements + "/" + count_el + ")</h3>");
    $("textarea#regex").before("<h3 class='stats'>Podmianiono linków: (" + link_changed + ")</h3>");

    $("#cache_html").find("a").each(function() {

        var old_url = $(this).attr("href");
        if (old_url != 'undefined' && old_url) {
            debounce = setTimeout(function() {
                getTiny(old_url);
            }, 500);
        } else {
            createChanges();
        }

    });
}


function getTiny(url) {

    if (url && url != ' ') {
        elements += 1;
        $.ajax({
            url: 'https://api.tinyurl.com/create',
            dataType: 'text',
            type: 'post',
            async: true,
            contentType: 'application/x-www-form-urlencoded',
            data: {
                url: url,
                domain: "tinyurl.com",
                api_token: "vH87my2yWhYHcqxLmlWDDmx5j5tF1GzskufLPTV2DuF6RoL33tFlZ4fCdSxq",
            },
            success: function(data, textStatus, jQxhr) {
                var dane = jQuery.parseJSON(data);
                //return dane.data.tiny_url;
                //console.log(dane.data.tiny_url);
                $(this).attr("href", dane.data.tiny_url);
                if (dane.data.tiny_url != '') {
                    replaceUrl(url, dane.data.tiny_url);
                    clearTimeout(debounce);
                }
            },
            error: function(jqXhr, textStatus, errorThrown) {
                //alert(textStatus + errorThrown);
                console.log("url: " + url + " err: " + textStatus + errorThrown);
            }
        });
    }

}



function replaceUrl(old_url, new_url) {

    link_changed += 1;

    if (jQuery.inArray(old_url, list_changed_links) == -1) {
        link_unique += 1;
        list_changed_links.push(old_url);
        $("textarea#regex").val($("textarea#regex").val() + new_url + " -> " + old_url + "\n");
    }

    //console.log("zamieniam :" + old_url + " na: " + new_url);
    var value_curr = $("textarea#output_url_text").val();

    var val_erp = value_curr.replace(old_url, new_url);

    $("textarea#output_url_text").val(val_erp);

    $("div.regex h3.stats").text("Podmieniono linków: (" + link_unique + "/" + link_changed + ")");

    $("#cache_html").html(val_erp);

    createChanges();
}

function inlineCss(html) {

    var juice_inline = juice(html);

    return juice_inline;


}

function minifyHtml(html) {

    return html.replace(/\n\s+|\n/g, "")
        .replace(/\:\s*/g, ':')
        .replace(/\n/g, '')
        .replace(/\s\s/g, '')
        .replace(/\;\}/g, '}');;

    /*
    var minified = minify(html, {
        removeAttributeQuotes: true
    });

    return minified;*/
}

function createChanges() {

    $(".url_to_change h3.stats").text("Wykryto linków: (" + elements + "/" + count_el + ")");
    $("div.regex h3.stats").text("Podmieniono linków: (" + link_unique + "/" + link_changed + ")");

    var inlinedCSS = inlineCss($("#output_url_text").val());
    $("#inline_html").val(inlinedCSS);


    var minifHtml = minifyHtml($("#inline_html").val());
    $("#minified_html").val(minifHtml);


}


/*

https://tinyurl.com/mr3cvn7u -> https://www.youtube.com/watch?v=jRXRlbcIeXA&utm_term=12+stycznia+2023&utm_medium=email&utm_source=audiostereo.pl&utm_campaign=Audio+Stereo
https://tinyurl.com/2bamhcxe -> https://www.tophifi.pl/salony.html?utm_term=12+stycznia+2023&utm_medium=email&utm_source=audiostereo.pl&utm_campaign=Audio+Stereo
https://tinyurl.com/mr3cvn7u -> https://www.youtube.com/watch?v=jRXRlbcIeXA&utm_term=12+stycznia+2023&utm_medium=email&utm_source=audiostereo.pl&utm_campaign=Audio+Stereo
https://tinyurl.com/5c385pdw -> https://www.tophifi.pl/?utm_term=12+stycznia+2023&utm_medium=email&utm_source=audiostereo.pl&utm_campaign=Audio+Stereo

        // admin@espectro.pw
        //qlgbwr0yyx2IkKSx3BhTRonOoT6nZYiA32pkwUgzAZBlfxGTePJoopY6VcHN
        //wcM6AyhKGKfXcPKzpWsdHpDDFPSbbOV1th2hnXUM4KLGnLzIx6RMZo681vKs

        //ljurski
        //vH87my2yWhYHcqxLmlWDDmx5j5tF1GzskufLPTV2DuF6RoL33tFlZ4fCdSxq
*/


import '../css/styles.css';