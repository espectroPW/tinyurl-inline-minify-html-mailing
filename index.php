<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <!--<script data-main="scripts" src="./node_modules/juice/client.js"></script>-->
    <script src="./dist/main.js"></script>

    <!--<script src="./assets/js/scripts.js"></script>-->
    <!--<link rel="stylesheet" href="./assets/css/styles.css" type="text/css">-->
</head>

<body>
    <h4>Przydatne linki: </h4>
    <p><a href="https://htmlemail.io/inline/">https://htmlemail.io/inline/</a></p>
    <p><a
            href="https://templates.mailchimp.com/resources/inline-css/">https://templates.mailchimp.com/resources/inline-css/</a>
    </p>
    <p><a href="https://www.willpeavy.com/tools/minifier/">https://www.willpeavy.com/tools/minifier/</a></p>

    <div class="main_div">
        <h1>Wprowadz html do podmiany: </h1>
        <!--oninput="render()"-->
        <div class="url_to_change">
            <textarea contenteditable="true" id="url_to_change" name="url_to_change" value=""></textarea>
            <br>
        </div>
        <div class="regex">
            <textarea id="regex"></textarea>
            <input type="button" id="sub" value="Konwertuj">
        </div>

        <div class="output_url_to_change">
            <p id="output_url_to_change"> </p>
            <textarea id="output_url_text"></textarea>
        </div>

        <h3>Inline css</h3>
        <div class="inline_html">
            <textarea id="inline_html"></textarea>
        </div>

        <h3>Minified</h3>
        <div class="minified_html">
            <textarea id="minified_html"></textarea>
        </div>

        <h3>Podgląd: </h3>
        <div id="cache_html"></div>
        <div id="cache_html_hiden"></div>

        <br>
        ***************************************
        <br>


    </div>

</body>

</html>

<html>