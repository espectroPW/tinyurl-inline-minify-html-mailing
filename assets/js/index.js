//inliner

var link_changed = 0;
var elements = 0;
var link_unique = 0;
var count_el = 0;
var list_changed_links = [];
var debounce = null;


$(document).ready(function() {

    $(".regex input#sub").click(function() {

        link_changed = 0;
        elements = 0;
        link_unique = 0;
        count_el = 0;
        list_changed_links = [];
        debounce = null;
        var output_element = '#output_url_text';
        clearTextarea();
        replaceByNewUrl();
    });


    $(".preview").click(function() {
        var preview_mode_width = [350, 550, 950];
        $("#cache_html").css("width", preview_mode_width[$(this).data("preview-mode") - 1]);
        $(".preview").removeClass("active");
        $(this).toggleClass("active");
    });

});


function replaceByNewUrl() {

    var backup_string = $("textarea#url_to_change").val();

    $("#cache_html").html(inlineCss(backup_string));
    count_el = $("#cache_html").find("a").length;
    $("textarea#output_url_text").val(backup_string);
    procesUrlHtml();


}


function procesUrlHtml() {

    $("#cache_html").find("a").each(function() {
        var old_url = $(this).attr("href");
        if (old_url != 'undefined' && old_url) {
            debounce = setTimeout(function() {
                if (old_url && old_url != ' ' && jQuery.inArray(old_url, list_changed_links) == -1) {
                    getTiny(old_url);
                    elements += 1;
                }
            }, 50);
        } else {
            createChanges();
        }
    });
}

function clearTextarea() {
    $("textarea#regex").val('');
    $("textarea#output_url_text").val('');
    $(".stats span").text('');
}


function getTiny(url) {

    $.ajax({
        url: 'https://api.tinyurl.com/create',
        dataType: 'text',
        type: 'post',
        async: false,
        contentType: 'application/x-www-form-urlencoded',
        data: {
            url: url,
            domain: "tinyurl.com",
            api_token: "vH87my2yWhYHcqxLmlWDDmx5j5tF1GzskufLPTV2DuF6RoL33tFlZ4fCdSxq",
        },
        success: function(data, textStatus, jQxhr) {
            var dane = jQuery.parseJSON(data);
            $(this).attr("href", dane.data.tiny_url);
            if (dane.data.tiny_url != '') {
                replaceUrl(url, dane.data.tiny_url);
                clearTimeout(debounce);
            }
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log("url: " + url + " err: " + textStatus + errorThrown);
        }
    });

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

    changeNumbersOfProcess(link_unique, link_changed);

    $("#cache_html").html(val_erp);

    createChanges();
}

function changeNumbersOfProcess(link_unique, link_changed) {
    $("div.regex h3.stats span").text("(" + link_unique + "/" + link_changed + ")");
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

    $(".url_to_change h3.stats span").text("(" + elements + "/" + count_el + ")");
    $("div.regex h3.stats span").text("(" + link_unique + "/" + link_changed + ")");

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
// ######################################################################


