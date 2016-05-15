module <%= moduleCamel %>.Configs{
    @Config()
    <% if (injectName) { %>@Inject(<%- injectName %>)
    <% } %>class <%= configName %>Config{
        constructor(<% if (injectName) { %><%= injectConstructor %><% } %>){
            console.log("<%= configName %> config")
        }
    }
}
