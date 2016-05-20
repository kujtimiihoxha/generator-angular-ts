/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.GettingStarted {
    @Route("gettingStarted.install",{
        url:"/install",
        templateUrl:"./views/routes/getting-started/install/install.template.html"
    })
    class InstallRoute{
        constructor(){
        }
    }
}
