/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Components {
    @Component('drawer',{
        templateUrl:'./views/components/drawer/drawer.template.html'
    })
    @Inject("MenuConstant")
    class DrawerComponent{
        constructor(private menuConstant:any){ }
    }
}
