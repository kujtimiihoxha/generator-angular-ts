module <%= moduleCamel %>.Services<%= module %> {
    @Service("<%= serviceName %>Service")
    <% if (injectName) { %>@Inject(<%- injectName %>)
    <% } %>class <%= serviceName %>Service{
        constructor(<% if (injectName) { %><%= injectConstructor %><% } %>){
            console.log("<%= serviceName %> service");
        }
    }
}
