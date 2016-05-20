/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.component",{
        url:"/component",
        templateUrl:"./views/routes/generators/component/component.template.html"
    })
    class ComponentRoute{
        constructor(){
        }
    }
}
