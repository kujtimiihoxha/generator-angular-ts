/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.run",{
        url:"/run",
        templateUrl:"./views/routes/generators/run/run.template.html"
    })
    class RunRoute{
        constructor(){
        }
    }
}
