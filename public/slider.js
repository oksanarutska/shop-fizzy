var slider = (function() {
        return {
            init: function (options) {
                const { container } = options;

                var current = 0;
                var itemCount = container.childNodes.length;

                var prev = function() {
                    this.current--;


                }
                var next = function () {
                    this.current++;
                }

                return {
                    current: current,
                    itemCount: itemCount,

                    next: next,
                    prev: prev
                };
            }
        };
    }());