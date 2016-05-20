/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.directive",{
        url:"/directive",
        templateUrl:"./views/routes/decorators/directive/directive.template.html"
    })
    class DirectiveRoute{
        constructor(){
        }
    }
}
