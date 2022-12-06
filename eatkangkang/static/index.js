const MODE_NORMAL = 1, MODE_ENDLESS = 2, MODE_PRACTICE = 3;

(function(w) {
    const DEFAULT_I18N_RESOURCE = 'en';

    function getJsonI18N() {
        let res;
        let lang = navigator.language.substring(0, 2);

        function ajax(name, error) {
            $.ajax({
                url: `./static/i18n/${name}.json`,
                dataType: 'json',
                method: 'GET',
                async: false,
                success: data =&gt; res = data,
                error: error
            });
        }

        ajax(lang, () =&gt; {
            ajax(DEFAULT_I18N_RESOURCE, () =&gt; {});
        })

        return res;
    }

    const I18N = getJsonI18N()

    $('[data-i18n]').each(function() {
        const content = I18N[this.dataset.i18n];
        $(this).text(content);
    });

    $('[data-placeholder-i18n]').each(function() {
        $(this).attr('placeholder', I18N[this.dataset.placeholderI18n]);
    });

    $('html').attr('lang', I18N['lang']);

    let isDesktop = !navigator['userAgent'].match(/(ipad|iphone|ipod|android|windows phone)/i);
    let fontunit = isDesktop ? 20 : ((window.innerWidth &gt; window.innerHeight ? window.innerHeight : window.innerWidth) / 320) * 10;
    document.write('<style type="text/css">' +
        'html,body {font-size:' + (fontunit < 30 ? fontunit : '30') + 'px;}' +
        (isDesktop ? '#welcome,#GameTimeLayer,#GameLayerBG,#GameScoreLayer.SHADE{position: absolute;}' :
            '#welcome,#GameTimeLayer,#GameLayerBG,#GameScoreLayer.SHADE{position:fixed;}@media screen and (orientation:landscape) </style>