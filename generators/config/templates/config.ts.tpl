module <%= moduleCamel %>.Configs{
    @Config()
    <% if (injectName!==null) { %>@Inject(<%- injectName %>)
    <% } %>class <%= configName %>Config{
        constructor(<% if (injectName!==null) { %><%= injectConstructor %><% } %>){
            console.log("<%= configName %> config")
        }
    }
}
