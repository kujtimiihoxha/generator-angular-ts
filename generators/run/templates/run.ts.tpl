module <%= moduleCamel %>.Runs{
    @Run()
    <% if (injectName!==null) { %>@Inject(<%- injectName %>)
    <% } %>class <%= runName %>Run{
        constructor(<% if (injectName!==null) { %><%= injectConstructor %><% } %>){
            console.log("<%= runName %> run");
        }
    }
}
