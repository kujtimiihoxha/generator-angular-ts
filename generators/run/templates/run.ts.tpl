module <%= moduleCamel %>.Runs{
    @Run()
    <% if (injectName) { %>@Inject(<%- injectName %>)
    <% } %>class <%= runName %>Run{
        constructor(<% if (injectName) { %><%= injectConstructor %><% } %>){
            console.log("<%= runName %> run");
        }
    }
}
