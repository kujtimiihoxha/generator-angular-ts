module <%= moduleCamel %>.Components<%= module%> {
    @Component('<%= selector %>',{
        templateUrl:'<%= path %>/<%= selector %>.template.html'<% if (bindingsValue!==null) { %>,
        bindings:{
<%- bindingsValue %>
        }<% } %>
    })    <% if (injectName!==null) { %>
    @Inject(<%- injectName %>)<% } %>
    class <%= selectorCamel %>Component{<% if (bindingsParam!==null) { %>
<%- bindingsParam %><% } %>
        constructor(<% if (injectName!==null) { %><%= injectConstructor %><% } %>){
            console.log("<%= selector %> component");
        }
    }
}
