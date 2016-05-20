/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes {
    @Route("gettingStarted",{
        url: '/getting-started',
        abstract: true,
        templateUrl:"./views/routes/getting-started/getting-started.template.html"
    })
    class GettingStartedRoute{
        constructor(){
        }
    }
}
