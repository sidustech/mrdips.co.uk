!(function ($) {
    "use strict";

    const dataAsString = '[{"id":"hummus","name":"Hummus","desc":"A traditional autentic starter made from chickpeas sesame seed pulp fresh garlic and lemon juice suitable for vegeterian.","ingr":"","avl":"Available in the following sizes 180g / 450g / 1000g / 1920g","adv":"Contains sesame seed","isVeg":true,"photos":["houmous2.jpg","p_0001.jpg"]},{"id":"taramasalata","name":"Tarama Salata","desc":"A traditional mediterranean dish made from smoked cod roe, bread crumbs and lemon juice.","ingr":"","avl":"Available in the following sizes 180g / 450g / 1000g / 1920g","adv":"Gluten Free","isVeg":false,"photos":["tarama2.jpg","p_0002.jpg"]},{"id":"tzatziki","name":"Tzatziki","desc":"A tradional mediterranean starter made from strained yoghurt, fresh cucumber, mint and fresh garlic.","ingr":"","avl":"Available in the following sizes 180g / 450g / 1000g / 1920g","adv":"Gluten Free","isVeg":true,"photos":["tzatziki2.jpg","p_0003.jpg"]},{"id":"yoghurt","name":"Yoghurt","desc":"Strained yoghurt made from fresh cow milk.","ingr":"","avl":"Available in the following sizes 180g / 450g / 1000g / 1920g 10Kg","adv":"Gluten Free","isVeg":true,"photos":["yoghurt2.jpg","p_0005.jpg"]},{"id":"tahini","name":"Tahini","desc":"A fresh starter made from sesame seed pulp, fresh garlic and lemon juice.","ingr":"","avl":"Available in the following sizes 180g / 450g","adv":"Gluten Free","isVeg":true,"photos":["p_0004.jpg"]},{"id":"product6","name":"","desc":"","ingr":"","avl":"","adv":"","isVeg":false,"photos":[]}]';

    function getProducts() {
        return dataAsString ? JSON.parse(dataAsString) : [];
    }

    function getURLParams() {
        return new URLSearchParams(window.location.search);
    }

    function getProdId() {
        const urlParams = getURLParams();
        return urlParams.has('prod') ? urlParams.get('prod') : '';
    }

    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './assets/json/products.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function init() {

        /*
        loadJSON(function (res) {
            var products = JSON.parse(res);
        });
        */

        var products = getProducts();
        var product = products.find(m => m.id == getProdId());

        if (!product)
            return;

        var innerHTML = '';
        for (let i = 0; i < product.photos.length; i++) {
            innerHTML += `<img src="./assets/img/portfolio/${product.photos[i]}" class="img-fluid" alt=""> \n`;
        }
        var elCarousel = document.getElementById('carousel2');
        if (innerHTML != '' && elCarousel) {
            elCarousel.innerHTML = innerHTML;

            elCarousel.classList.add('portfolio-details-carousel');

            $("#carousel2").owlCarousel({
                autoplay: true,
                dots: true,
                loop: true,
                items: 1
            });
        }

        var elProdDesc = document.getElementById('dvProdDesc');
        if (elProdDesc)
            elProdDesc.innerHTML = elProdDesc.innerHTML.replace(/{{name}}/g, product.name).replace(/{{desc}}/g, product.desc);

        var elProdInfo = document.getElementById('dvProdInfo');
        if (elProdInfo)
            elProdInfo.innerHTML = elProdInfo.innerHTML.replace(/{{avl}}/g, product.avl).replace(/{{adv}}/g, product.adv);


        if (elProdInfo && product.id == 'taramasalata') {
            var lastli = elProdInfo.querySelector('ul > li:last-child');
            lastli.setAttribute('style', 'display:none');
        }
    }

    $(window).on('load', function () {
        init();
    });

})(jQuery);