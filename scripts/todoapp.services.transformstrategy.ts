/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested 
module ToDoApp {

    export interface ITransformStrategy {
        transform(o: Spiro.DomainObjectRepresentation, transformer: ITransformer) : ng.IPromise<any>;
        transform(o: Spiro.ResourceRepresentation, transformer: ITransformer): ng.IPromise<any>;
    }


    // this is the default transform strategy that flattens the object
    app.service('transformStrategy', function($q : ng.IQService) {

        var transformStrategy = <ITransformStrategy>this;

        function transformObject(o: Spiro.DomainObjectRepresentation, transformer: ITransformer) {

            var defer = $q.defer();


            var names = _.map(o.propertyMembers(), (v, n: string) => n);
            var values = _.map(o.propertyMembers(), (v: Spiro.PropertyMember) => v.value().toString());
            var tdi = <any>_.object(names, values);
            tdi["nof_rep"] = o;
            tdi["nof_url"] = "#" + "/" + o.domainType() + "/" + o.instanceId();

            defer.resolve(tdi);

            return defer.promise;
        };

        function transformActionResult(ar: Spiro.ActionResultRepresentation, transformer: ITransformer) {
            var list = ar.result().list().value().models;

            var resultArray : ng.IPromise<any>[] = [];

            _.each((list), (l: Spiro.Link) => {

                var tgt = l.getTarget();
                resultArray.push(transformer.transform(tgt.hateoasUrl, Spiro.DomainObjectRepresentation));

            });

            return $q.all(resultArray);
        };


        transformStrategy.transform = function (r: Spiro.ResourceRepresentation, transformer: ITransformer) {
            if (r instanceof Spiro.DomainObjectRepresentation) {
                return transformObject(<Spiro.DomainObjectRepresentation>r, transformer);
            }
            if (r instanceof Spiro.ActionResultRepresentation) {
                return transformActionResult(<Spiro.ActionResultRepresentation>r, transformer);
            }

            var defer = $q.defer();
            defer.reject("not supported rep");
            return defer.promise;
        };

    });
}