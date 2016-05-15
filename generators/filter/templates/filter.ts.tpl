module <%= moduleCamel %>.Configs{
    @Filter('<%= filter %>')
    class <%= filterName %>Config{
        constructor(input:string<% if (parameters) { %>,<%= parameters %><%}%>){
            var out = "";
            //Do something with the input.
            return out;
        }
    }
}
