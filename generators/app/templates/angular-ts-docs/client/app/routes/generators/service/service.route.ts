/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.service",{
        url:"/service",
        templateUrl:"./views/routes/generators/service/service.template.html"
    })
    class ServiceRoute{
        constructor(){
        }
    }
}
