//inliner
var juice = require('juice');

var link_changed = 0;


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
    $("#inline_html").val(inlineCss(backup_string));

    $("#cache_html iframe").html(backup_string);
    $("textarea#output_url_text").val(backup_string);

    var elements = 0;
    $("#cache_html iframe").find("a").each(function() {

        var old_url = $(this).attr("href");
        if (old_url != 'undefined' && old_url) {
            getTiny(old_url);
            elements += 1;
        }
    });

    $("textarea#url_to_change").before("<h3 class='stats'>Wykryto linków: " + elements + "</h3>");
    $("textarea#regex").before("<h3 class='stats'>Podmianiono linków: " + link_changed + "</h3>");

}


function getTiny(url) {

    if (url && url != ' ') {
        $.ajax({
            url: 'https://api.tinyurl.com/create',
            dataType: 'text',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                url: url,
                domain: "tinyurl.com",
                api_token: "vH87my2yWhYHcqxLmlWDDmx5j5tF1GzskufLPTV2DuF6RoL33tFlZ4fCdSxq",
            },
            success: function(data, textStatus, jQxhr) {
                var dane = jQuery.parseJSON(data);
                //return dane.data.tiny_url;
                console.log(dane.data.tiny_url);
                $(this).attr("href", dane.data.tiny_url);
                if (dane.data.tiny_url != '') {
                    replaceUrl(url, dane.data.tiny_url);
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

    console.log("zamieniam :" + old_url + " na: " + new_url);
    $("textarea#regex").val($("textarea#regex").val() + new_url + " -> " + old_url + "\n");
    var value_curr = $("textarea#output_url_text").val();

    var val_erp = value_curr.replace(old_url, new_url);

    $("textarea#output_url_text").val(val_erp);

    $("div.regex h3.stats").text("Podmianiono linków: " + link_changed);

    $("#cache_html iframe").html(val_erp);



    /*
    const regexp = "href=([\"'])(.*)(['\"])/";

    $("textarea#output_url_text").val(backup_string.split(regexp).join("xxxxxxxxxxxxxxxx"));

    */

}

function inlineCss(html) {

    var juice_inline = juice(html);

    return juice_inline;


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