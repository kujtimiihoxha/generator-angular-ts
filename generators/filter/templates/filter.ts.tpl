module <%= moduleCamel %>.Filters{
    @Filter('<%= filter %>')
    class <%= filterName %>Config{
        constructor(input:string<% if (parameters!==null) { %>,<%= parameters %><%}%>){
            var out = "";
            //Do something with the input.
            return out;
        }
    }
}
