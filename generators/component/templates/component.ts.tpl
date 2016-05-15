module <%= moduleCamel %>.Components<%= module%> {
    @Component('<%= selector %>',{
        templateUrl:'<%= path %>/<%= selector %>.template.html'<% if (bindings) { %>,
        bindings:{
<%- bindingsValue %>
        }<% } %>
    })    <% if (injectName) { %>
    @Inject(<%- injectName %>)<% } %>
    class <%= selectorCamel %>Component{<% if (bindings) { %>
<%- bindingsParam %><% } %>
        constructor(<% if (injectName) { %><%= injectConstructor %><% } %>){
            console.log("<%= selector %> component");
        }
    }
}
