module <%= moduleCamel %>.Filters{
    @Filter('<%= filter %>')
    class <%= filterName %>Filter{
        constructor(input:string<% if (parameters!==null) { %>,<%= parameters %><%}%>){
            var out = "";
            //Do something with the input.
            return out;
        }
    }
}
