/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // this is the default transform strategy that flattens the object
    ToDoApp.app.service('transformStrategy', function ($q) {
        var transformStrategy = this;

        function transformObject(o, transformer) {
            var defer = $q.defer();

            var names = _.map(o.propertyMembers(), function (v, n) {
                return n;
            });
            var values = _.map(o.propertyMembers(), function (v) {
                return v.value().toString();
            });
            var tdi = _.object(names, values);
            tdi["nof_rep"] = o;
            tdi["nof_url"] = "#" + "/" + o.domainType() + "/" + o.instanceId();

            defer.resolve(tdi);

            return defer.promise;
        }
        ;

        function transformActionResult(ar, transformer) {
            var list = ar.result().list().value().models;

            var resultArray = [];

            _.each((list), function (l) {
                var tgt = l.getTarget();
                resultArray.push(transformer.transform(tgt.hateoasUrl, Spiro.DomainObjectRepresentation));
            });

            return $q.all(resultArray);
        }
        ;

        transformStrategy.transform = function (r, transformer) {
            if (r instanceof Spiro.DomainObjectRepresentation) {
                return transformObject(r, transformer);
            }
            if (r instanceof Spiro.ActionResultRepresentation) {
                return transformActionResult(r, transformer);
            }

            var defer = $q.defer();
            defer.reject("not supported rep");
            return defer.promise;
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.transformstrategy.js.map
