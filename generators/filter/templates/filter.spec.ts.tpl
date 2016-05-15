module Tests.Filters {
  @<%= moduleCamel %>.Test(
    {
      modules: '<%= moduleName %>',
      inject:['$filter']
    }
  )
  class <%= filterName %>FilterTest{
    constructor(deps){
      it('some test', function () {
          //Your filter
          let <%= filter %> = deps.$filter('<%= filter %>');
      });
    }
  }
}
