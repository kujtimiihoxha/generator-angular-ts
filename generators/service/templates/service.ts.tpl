module <%= moduleCamel %>.Services<%= module %> {
    @Service("<%= serviceName %>Service")
    <% if (injectName!==null) { %>@Inject(<%- injectName %>)
    <% } %>class <%= serviceName %>Service{
        constructor(<% if (injectName!=null) { %><%= injectConstructor %><% } %>){
            console.log("<%= serviceName %> service");
        }
    }
}
