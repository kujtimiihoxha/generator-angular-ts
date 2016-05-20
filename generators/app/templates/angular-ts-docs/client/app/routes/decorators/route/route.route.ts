/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.route",{
        url:"/route",
        templateUrl:"./views/routes/decorators/route/route.template.html"
    })
    class RouteRoute{
        constructor(){
        }
    }
}
