/// <reference path="typings/underscore/underscore.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="spiro.angular.viewmodels.ts" />
/// <reference path="spiro.angular.app.ts" />
/// <reference path="spiro.angular.config.ts" />
var Spiro;
(function (Spiro) {
    (function (Angular) {
        Angular.app.service('color', function () {
            var color = this;

            function hashCode(toHash) {
                var hash = 0, i, chr;
                if (toHash.length == 0)
                    return hash;
                for (i = 0; i < toHash.length; i++) {
                    chr = toHash.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash = hash & hash; // Convert to 32bit integer
                }
                return hash;
            }
            ;

            function getColorMapValues(dt) {
                var clr = dt ? Angular.colorMap[dt] : Angular.defaultColor;
                if (!clr) {
                    var hash = Math.abs(hashCode(dt));
                    var index = hash % 18;
                    clr = Angular.defaultColorArray[index];
                    Angular.colorMap[dt] = clr;
                }
                return clr;
            }

            function typeFromUrl(url) {
                var typeRegex = /(objects|services)\/([\w|\.]+)/;
                var results = (typeRegex).exec(url);
                return (results && results.length > 2) ? results[2] : "";
            }

            // tested
            color.toColorFromHref = function (href) {
                var type = typeFromUrl(href);
                return "bg-color-" + getColorMapValues(type);
            };

            color.toColorFromType = function (type) {
                return "bg-color-" + getColorMapValues(type);
            };
        });
    })(Spiro.Angular || (Spiro.Angular = {}));
    var Angular = Spiro.Angular;
})(Spiro || (Spiro = {}));
//# sourceMappingURL=spiro.angular.services.color.js.map
