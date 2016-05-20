/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Configs{
    @Config()
    @Inject('$urlRouterProvider')
    class CoreConfig{
        constructor($urlRouterProvider:any){
            $urlRouterProvider.otherwise("/angular-ts/quickStart");
        }
    }
}
