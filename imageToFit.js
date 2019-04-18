/*!
 * Image To Fit v1.0.0 (https://github.com/gyuner/ImageToFit.js)
 * Copyright (c) 2019 Güner Selamoğlu
 * Licensed under the MIT license
 */

function ready(callback) {

    // Document is ready

    if (document.readyState != 'loading') callback();

    // Modern browsers

    else if (document.addEventListener)

        document.addEventListener('DOMContentLoaded', callback);

    // IE <= 8

    else document.attachEvent('onreadystatechange', function() {

        if (document.readyState == 'complete') callback();

    });
}

var imageToFit = (function() {

    function init() {

        const toFitImages = document.querySelectorAll("[image-to-fit]");

        Array.prototype.forEach.call(toFitImages, function(image) {

            var pNodeWidth = Math.floor(image.parentNode.clientWidth),
                pNodeHeight = Math.floor(image.parentNode.clientHeight),
                fitPercent = parseInt(image.getAttribute("image-to-fit")),
                theImage = new Image(),
                imageHCalc = (pNodeHeight / 100) * fitPercent,
                imageWCalc = (pNodeWidth / 100) * fitPercent;

            // If use just attribute with out percent value    
            if (!image.getAttribute("image-to-fit").includes("%")) {
                imageHCalc = pNodeHeight;
                imageWCalc = pNodeWidth;
            }

            theImage.src = image.getAttribute("src");

            var imageW = theImage.width,
                imageH = theImage.height;

            // If the image is larger than the parent
            if (imageW >= pNodeWidth || imageH >= pNodeHeight) {

                if (fitPercent <= 100 || isNaN(fitPercent)) {
                    // Image is Horizontal
                    if (imageW > imageH) {
                        image.removeAttribute("height");
                        image.width = imageWCalc;

                        if (image.height > pNodeHeight) {
                            image.removeAttribute("width");
                            image.height = imageHCalc;
                        }

                        // Image is Vertical
                    } else if (imageH > imageW) {
                        image.removeAttribute("width");
                        image.height = imageHCalc;

                        if (image.width > pNodeWidth) {
                            image.removeAttribute("height");
                            image.width = imageWCalc;
                        }
                        // Imagse is Square
                    } else if (imageH == imageW) {
                        if (imageHCalc < pNodeWidth) {
                            image.removeAttribute("width");
                            image.height = imageHCalc;
                        } else {
                            image.removeAttribute("height");
                            image.width = imageWCalc;
                        }
                    }
                }
            } else {
                image.removeAttribute("height");
                image.removeAttribute("width");
            }

        });
    }

    init();

    return {
        init: init
    }

})();

// Recalculate when resize window
window.onresize = function(event) {
    imageToFit.init();
};

// Document ready for Image To Fit
ready(function() {
    imageToFit.init();
});