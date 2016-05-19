module <%= moduleCamel %>.Routes<%= module%> {
    @Route("<%= routeName %>",{<% if (abstract) {%>
        abstract: true,<% }%> <% if (routeUrl!==null) {%>
        url:"<%= routeUrl %>",<% } %> <% if (component!==null) { %>
        template:"<<%= component %>></<%= component %>>"<% } %> <% if (component===null) { %>
        templateUrl:"<%= templateUrl %>"<% } %>
    })
    <% if (injectName!==null) { %>@Inject(<%- injectName %>)
    <% } %>class <%= name %>Route{
        constructor(<% if (injectConstructor!==null) { %><%= injectConstructor %><% } %>){
        }
    }
}
