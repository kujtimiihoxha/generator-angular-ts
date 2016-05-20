/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.AngularTypescript {
    @Route("angularTypescript.credits",{
        url:"/credits",
        templateUrl:"./views/routes/angular-typescript/credits/credits.template.html"
    })
    class CreditsRoute{
        constructor(){
        }
    }
}
