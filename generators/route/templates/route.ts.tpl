module <%= moduleCamel %>.Routes<%= module%> {
    @Route("<%= routeName %>",{<% if (abstract) {%>
        abstract: true,<% }%> <% if (routeUrl) {%>
        url:"<%= routeUrl %>",<% } %> <% if (component) { %>
        template:"<<%= component %>></<%= component %>>"<% } %> <% if (!component) { %>
        templateUrl:"<%= templateUrl %>"<% } %>
    })
    <% if (injectName) { %>@Inject(<%- injectName %>)
    <% } %>class <%= name %>Route{
        constructor(<% if (injectConstructor) { %><%= injectConstructor %><% } %>){
        }
    }
}
