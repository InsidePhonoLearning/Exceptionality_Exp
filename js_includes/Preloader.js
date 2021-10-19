/*Alex Drummond's controller for preloading images*/

define_ibex_controller({
    name: "Preloader",
    jqueryWidget: {
        _init: function () {
            this.images = this.options.images;
            this.element.append("Loading images...");

            this.preloadedImages = [ ];
            var numToPreload = this.images.length;
            for (var i = 0; i < this.images.length; ++i) {
                var img = new Image();
                img.src = this.images[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
            console.log(this.preloadedImages.length);
        }
    },
    properties: {
        countsForProgressBar: false
    }
});