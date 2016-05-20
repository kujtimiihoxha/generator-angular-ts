/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.inject",{
        url:"/inject",
        templateUrl:"./views/routes/decorators/inject/inject.template.html"
    })
    class InjectRoute{
        constructor(){
        }
    }
}
