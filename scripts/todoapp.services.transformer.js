/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested
var ToDoApp;
(function (ToDoApp) {
    ToDoApp.app.service('transformer', function (repLoader, $q, transformStrategy) {
        var transformer = this;

        transformer.transform = function tt(url, c) {
            var obj = new c({});
            obj.hateoasUrl = url;
            return repLoader.populate(obj).then(function (o) {
                return transformStrategy.transform(o, transformer);
            });
        };
    });
})(ToDoApp || (ToDoApp = {}));
//# sourceMappingURL=todoapp.services.transformer.js.map
