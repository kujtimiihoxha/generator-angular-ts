/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.GettingStarted {
    @Route("gettingStarted.usage",{
        url:"/usage",
        templateUrl:"./views/routes/getting-started/usage/usage.template.html"
    })
    class UsageRoute{
        constructor(){
        }
    }
}
