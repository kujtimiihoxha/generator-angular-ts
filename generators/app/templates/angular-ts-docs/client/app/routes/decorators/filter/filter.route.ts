/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.filter",{
        url:"/filter",
        templateUrl:"./views/routes/decorators/filter/filter.template.html"
    })
    class FilterRoute{
        constructor(){
        }
    }
}
