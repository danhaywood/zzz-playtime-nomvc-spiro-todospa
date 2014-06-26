/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    // this is the default transform strategy that flattens the object
    ToDoApp.app.service('transformStrategy', function () {
        var transformer = this;

        function transformObject(o) {
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

        transformer.transform = function (r) {
            if (r instanceof Spiro.DomainObjectRepresentation) {
                return transformObject(r);
            }
            return null;
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.transform.js.map
