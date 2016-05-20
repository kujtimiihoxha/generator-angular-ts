/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>{
    angular.module("<%= appModule %>",['<%= appModule %>.templates','ui.router']);
}
