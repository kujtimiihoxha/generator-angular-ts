/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Directives{
    @Directive("prism",{
        restrict: 'A',
        template:"<code></code>",
        scope: {
            source: '@'
        },
    })
    @Inject("$compile","$timeout")
    class PrismDirective{
        constructor(private compile: any,private timeout:any){
        }

        static link(scope:any, element:any, attrs:any,controller:any, transclude:any) {
            scope.$watch('source', function(v:any) {
                if( v.match(/(<([^>]+)>)/ig)){
                    v.match(/(<([^>]+)>)/ig).forEach((element:any)=>{
                        v= v.replace(element,element.replace('<','&lt;'));
                    });
                }
                if(attrs.class === "language-json"){
                    element.find("code").html(JSON.stringify(JSON.parse(v),null,2));
                }
                else{

                    element.find("code").html(v);
                }
                Prism.highlightElement(element.find("code")[0]);
            });

        }
    }
}
