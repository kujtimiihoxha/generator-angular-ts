/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Routes.Decorators {
    @Route("decorators.constant",{
        url:"/constant",
        templateUrl:"./views/routes/decorators/constant/constant.template.html"
    })
    class ConstantRoute{
        constructor(){
        }
    }
}
