/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested 
module ToDoApp {

    export interface ITransformedRepresentation {
        [index: string]: any
    }

    export interface ITransformer {
        transform<T extends Spiro.ResourceRepresentation>(url: string, c: { new (any): T }) : ng.IPromise<ITransformedRepresentation>;
    }

    app.service('transformer', function (repLoader: Spiro.Angular.IRepLoader, $q: ng.IQService, transformStrategy : ITransformStrategy) {

        var transformer = <ITransformer>this;

        transformer.transform = <T extends Spiro.ResourceRepresentation>(url: string, c: {new( any ) : T}) => {

            var deferred = $q.defer();
            var obj = new c({});
            obj.hateoasUrl = url;
            repLoader.populate(obj).then((o: Spiro.ResourceRepresentation) => {
                var flat = transformStrategy.transform(o);
                deferred.resolve(flat);
            }, () => {
                deferred.reject();
            });

            return deferred.promise;
        };
    });
}