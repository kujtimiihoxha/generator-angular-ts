module <%= moduleCamel %>.Directives{
    @Directive("<%= selector %>",{
        restrict: 'A'
    })
    <% if (injectName!==null) { %>@Inject(<%- injectName %>)
    <% } %>class <%= selectorCamel %>Directive{
        value="<%= selector %>";
        constructor(<% if (injectName!==null) { %><%= injectConstructor %><% } %>){
            console.log("<%= selector %> directives");
        }<% if (compile) { %>

        static compile(tElement:any, tAttrs:any, transclude:any) {
            //Before compilation
            console.log("Before Compile")
            return {
                pre: function preLink(scope:any, iElement:any, iAttrs:any, controller:any) {
                    //pre link implementation.
                },
                post: function postLink(scope:any, iElement:any, iAttrs:any, controller:any) {
                    //post link implementation.
                }
            }
        }<% } %><% if (link) { %>

        static link(scope:any, element:any, attrs:any) {
            console.log("Link")
            element.addClass('my-class')
        }
        <% } %>
    }
}
