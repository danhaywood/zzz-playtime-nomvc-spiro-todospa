/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="spiro.models.ts" />
/// <reference path="todoapp.app.ts" />
// tested 
module ToDoApp {

    export interface ITransformStrategy {
        transform(o: Spiro.DomainObjectRepresentation);
        transform(o: Spiro.ResourceRepresentation);
    }


    // this is the default transform strategy that flattens the object
    app.service('transformStrategy', function() {

        var transformer = <ITransformStrategy>this;

        function transformObject(o: Spiro.DomainObjectRepresentation) {

            var names = _.map(o.propertyMembers(), (v, n: string) => n);
            var values = _.map(o.propertyMembers(), (v: Spiro.PropertyMember) => v.value().toString());
            var tdi = <any>_.object(names, values);
            tdi["nof_rep"] = o;
            tdi["nof_url"] = "#" + "/" + o.domainType() + "/" + o.instanceId();

            return tdi;
        };

        transformer.transform = function(r: Spiro.ResourceRepresentation) {
            if (r instanceof Spiro.DomainObjectRepresentation) {
                return transformObject(<Spiro.DomainObjectRepresentation>r);
            }
            return null;
        };

    });
}