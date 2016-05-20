/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.AngularTypescript {
    @Route("angularTypescript.quickStart",{
        url:"/quickStart",
        templateUrl:"./views/routes/angular-typescript/quick-start/quick-start.template.html"
    })
    class QuickStartRoute{
        constructor(){
        }
    }
}
