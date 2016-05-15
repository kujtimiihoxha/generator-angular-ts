module Tests.Services<%= module%> {
  @<%= moduleCamel %>.Test(
    {
      modules: '<%= moduleName %>',
      inject: ['<%= serviceName %>Service'], // for making test calls
    }
  )
  class <%= serviceName %>ServiceTest{
    constructor(deps){
      it('some test', function () {
       //deps.<%= serviceName %>Service is the service
      });
    }
  }
}
