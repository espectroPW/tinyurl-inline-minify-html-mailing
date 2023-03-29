<!DOCTYPE html>
<html>

<?php require_once 'templates/header.php'; ?>

<body>
    <br>
    <a href="stats.php">Statystyki</a>
    <br><br>
    <h4>Przydatne linki: </h4>
    <p><a href="https://htmlemail.io/inline/">https://htmlemail.io/inline/</a></p>
    <p><a href="https://templates.mailchimp.com/resources/inline-css/">https://templates.mailchimp.com/resources/inline-css/</a>
    </p>
    <p><a href="https://www.willpeavy.com/tools/minifier/">https://www.willpeavy.com/tools/minifier/</a></p>

    <div class="main_div">
        <h1>Wprowadz html do podmiany: </h1>
        <!--oninput="render()"-->
        <div class="url_to_change">
            <h3 class='stats'>Wykryto linków: <span></span></h3>
            <textarea contenteditable="true" id="url_to_change" name="url_to_change" value=""></textarea>
            <br>
        </div>
        <div class="regex">
            <h3 class='stats'>Podmianiono linków:<span></span></h3>
            <textarea id="regex"></textarea>
            <input type="button" id="sub" value="Konwertuj">
        </div>


        <div class="output_url_to_change">
            <h3>Wynik z podmianą:</h3>
            <textarea id="output_url_text"></textarea>
        </div>


        <div class="inline_html">
            <h3>Inline css</h3>
            <textarea id="inline_html"></textarea>
        </div>


        <div class="minified_html">
            <h3>Minified</h3>
            <textarea id="minified_html"></textarea>
        </div>

        <h3>Podgląd: </h3>
        <div>
            <span class="preview" data-preview-mode="1">Mobile</span>
            <span class="preview" data-preview-mode="2">Tablet</span>
            <span class="preview" data-preview-mode="3">Desktop</span>
        </div>
        <div id="cache_html"></div>
        <div id="cache_html_hiden"></div>



    </div>

</body>

</html>