// statsy

$(document).ready(function() {
    getDataFromApi();
});










var data_stats = '';



function renderStats(dane) {
    console.log(dane);
    const template = document.getElementById('template').innerHTML;
    const rendered = Mustache.render(template, data_stats);
    document.getElementById('target').innerHTML = rendered;
}

function getDataFromApi() {

    $.ajax({
        url: 'https://api.tinyurl.com/analytics/general',
        dataType: 'application/json',
        type: 'GET',
        async: false,
        //contentType: 'application/x-www-form-urlencoded',
        data: {
            from : "2021-08-10",
            api_token: "io8NOrrVpBXZp23NDPut5BhllCmJVa0ejwCC5dqOaMsRcBmJWggErAPrXFWT",
        },
        success: function(data, textStatus, jQxhr) {
            var dane = jQuery.parseJSON(data);
            console.log(dane);
            data_stats = dane;
            renderStats(data_stats);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(" err: " + textStatus + errorThrown);
        }
    });


}
