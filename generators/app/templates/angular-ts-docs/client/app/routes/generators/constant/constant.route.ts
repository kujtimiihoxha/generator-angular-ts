/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Generators {
    @Route("generators.constant",{
        url:"/constant",
        templateUrl:"./views/routes/generators/constant/constant.template.html"
    })
    class ConstantRoute{
        constructor(){
        }
    }
}
