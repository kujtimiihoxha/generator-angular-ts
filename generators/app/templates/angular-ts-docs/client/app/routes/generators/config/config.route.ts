/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.config",{
        url:"/config",
        templateUrl:"./views/routes/generators/config/config.template.html"
    })
    class ConfigRoute{
        constructor(){
        }
    }
}
