/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.run",{
        url:"/run",
        templateUrl:"./views/routes/decorators/run/run.template.html"
    })
    class RunRoute{
        constructor(){
        }
    }
}
