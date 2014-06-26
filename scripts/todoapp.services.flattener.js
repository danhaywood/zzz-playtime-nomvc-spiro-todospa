/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    ToDoApp.app.service('flattener', function (repLoader, $q) {
        var flattener = this;

        function flattenObject(o) {
            var names = _.map(o.propertyMembers(), function (v, n) {
                return n;
            });
            var values = _.map(o.propertyMembers(), function (v) {
                return v.value().toString();
            });
            var tdi = _.object(names, values);
            tdi["nof_rep"] = o;
            tdi["nof_url"] = "#" + "/" + o.domainType() + "/" + o.instanceId();

            return tdi;
        }
        ;

        flattener.getPromise = function (url, transform) {
            var deferred = $q.defer();
            var obj = new Spiro.DomainObjectRepresentation({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then(function (o) {
                var flat = transform(o);
                deferred.resolve(flat);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        };

        flattener.flatten = function (url) {
            return flattener.getPromise(url, flattenObject);
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.flattener.js.map
