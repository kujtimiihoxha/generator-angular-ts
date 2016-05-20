/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.AngularTypescript {
    @Route("angularTypescript.features",{
        url:"/features",
        templateUrl:"./views/routes/angular-typescript/features/features.template.html"
    })
    class FeaturesRoute{
        constructor(){
        }
    }
}
