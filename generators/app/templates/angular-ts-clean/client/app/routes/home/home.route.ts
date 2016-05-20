/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes {
    @Route("home",{
        url:"/",
        templateUrl:"./views/routes/home/home.template.html"
    })
    class HomeRoute{
        constructor(){
        }
    }
}
