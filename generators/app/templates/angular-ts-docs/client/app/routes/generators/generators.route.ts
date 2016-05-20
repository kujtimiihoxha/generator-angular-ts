/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes {
    @Route("generators",{
        url:'/generators',
        abstract: true,
        templateUrl:"./views/routes/generators/generators.template.html"
    })
    class GeneratorsRoute{
        constructor(){
        }
    }
}
