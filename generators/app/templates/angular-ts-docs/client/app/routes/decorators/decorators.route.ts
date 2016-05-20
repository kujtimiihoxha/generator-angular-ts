/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes {
    @Route("decorators",{
        url:'/decorators',
        abstract: true,
        templateUrl:"./views/routes/decorators/decorators.template.html"
    })
    class DecoratorsRoute{
        constructor(){
        }
    }
}
