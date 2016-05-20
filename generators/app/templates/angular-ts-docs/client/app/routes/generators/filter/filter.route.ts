/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.filter",{
        url:"/filter",
        templateUrl:"./views/routes/generators/filter/filter.template.html"
    })
    class FilterRoute{
        constructor(){
        }
    }
}
