/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.route",{
        url:"/route",
        templateUrl:"./views/routes/generators/route/route.template.html"
    })
    class RouteRoute{
        constructor(){
        }
    }
}
