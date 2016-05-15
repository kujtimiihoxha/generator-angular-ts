module Tests.Components<%= module%> {
  @<%= moduleCamel %>.Test(
    {
      modules: '<%= moduleName %>',
      element: '<<%= selector %>></<%= selector %>>',
      parentScope: {
        //some parent scope values
      },
    }
  )
  class <%= selectorCamel %>ComponentTest{
    constructor(deps){
      it('some test', function () {
       //deps.element.isolateScope().vm is the component scope
      });
    }
  }
}
