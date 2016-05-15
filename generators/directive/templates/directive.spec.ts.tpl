module Tests.Directives {
  @<%= moduleCamel %>.Test(
    {
      modules: '<%= moduleName %>',
      element: '<div <%= selector %>></div>',
      parentScope: {
        //some parent scope values
      },
    }
  )
  class <%= selectorCamel %>DirectiveTest{
    constructor(deps){
      it('some test', function () {
       //deps.element.isolateScope().vm is the directive scope
      });
    }
  }
}
