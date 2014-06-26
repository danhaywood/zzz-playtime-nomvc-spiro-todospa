/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested 
module ToDoApp {

    export interface IFlattenedObject {
        [index: string]: any
    }

    export interface IFlattener {
        getPromise(url: string, transform: (o: Spiro.DomainObjectRepresentation) => IFlattenedObject): ng.IPromise<IFlattenedObject>;
        flatten(url: string): ng.IPromise<IFlattenedObject>;
    }

    app.service('flattener', function (repLoader: Spiro.Angular.IRepLoader, $q: ng.IQService) {

        var flattener = <IFlattener>this;

        function flattenObject (o: Spiro.DomainObjectRepresentation) {

            var names = _.map(o.propertyMembers(), (v, n: string) => n);
            var values = _.map(o.propertyMembers(), (v: Spiro.PropertyMember) => v.value().toString());
            var tdi = <IFlattenedObject>_.object(names, values);
            tdi["nof_rep"] = o;
            tdi["nof_url"] = "#" + "/" + o.domainType() + "/" + o.instanceId();

            return tdi;
        };

        flattener.getPromise = (url: string, transform: (o: Spiro.DomainObjectRepresentation) => IFlattenedObject) => {

            var deferred = $q.defer();
            var obj = new Spiro.DomainObjectRepresentation({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then((o: Spiro.DomainObjectRepresentation) => {
                var flat = transform(o);
                deferred.resolve(flat);
            }, () => {
                deferred.reject();
            });

            return deferred.promise;
        };

        flattener.flatten = (url: string) => {
            return flattener.getPromise(url, flattenObject);
        };

    });
}