/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>{
    import IDirective = angular.IDirective;
    import IStateProvider = angular.ui.IStateProvider;
    import IState = angular.ui.IState;
    export function Component(slct:string, component: angular.IComponentOptions): any {
        return (target: any) => {
            const selector = dashCaseToCamelCase(slct);
            if(angular.isUndefined(component.controller)){
                component.controller = target;
            }
            if(angular.isUndefined(component.controllerAs)){
                component.controllerAs = 'vm'
            }
            angular.module("<%= appModule %>").component(selector, component);
        }
    }
    /**
     * Config decorator.
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Config(): any {
        return (target: any) => {
            angular.module("<%= appModule %>").config(target);
        };
    }

    /**
     * Constant decorator
     * @param name constant name.
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Constant(name:string): any {
        return (Target: any) => {
            angular.module("<%= appModule %>").constant(name, new Target());
        };
    }

    /**
     * Filter directive
     * @param name filter name
     * @returns {function(any): undefined}
     * @constructor
     */
    export  function Filter(name:string): any {
        return (target: any) => {
            angular.module("<%= appModule %>").filter(name, () => { return target});
        };
    }

    /**
     * Directive decorator
     * @param slct selector
     * @param directiveOptions options
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Directive(slct:string, directiveOptions:IDirective): any {
        return (target: any) => {
            const selector = dashCaseToCamelCase(slct);
            if(angular.isUndefined(directiveOptions.controller)){
                directiveOptions.controller = target;
            }
            if(angular.isUndefined(directiveOptions.controllerAs)){
                directiveOptions.controllerAs = 'vm'
            }
            if(angular.isDefined(target.link)){
                directiveOptions.link = target.link;
            }
            if(angular.isDefined(target.compile)){
                directiveOptions.compile = target.compile;
            }
            angular.module("<%= appModule %>").directive(selector, ()=>{
                return directiveOptions;
            });
        };
    }

    /**
     * Route directive
     * @param stateName state name
     * @param stateOptions state options
     * @returns {function(any): undefined}
     * @constructor
     */

    export  function Route(stateName: any, stateOptions: IState): any {
        "use strict";
        return (target: any) => {
            angular.module("<%= appModule %>").config(["$stateProvider", ($stateProvider: IStateProvider) => {
                if(angular.isUndefined(stateOptions.controller)){
                    stateOptions.controller = target;
                }
                if(angular.isUndefined(stateOptions.controllerAs)){
                    stateOptions.controllerAs = 'vm'
                }
                $stateProvider.state(stateName, stateOptions);
            }]);
        };
    }

    /**
     * Run decorator
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Run(): any {
        return (target: any) => {
            angular.module("<%= appModule %>").run(target);
        };
    }

    /**
     * Service decorator
     * @param name service name
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Service(name: string): any {
        return (target: any) => {
            angular.module("<%= appModule %>").service(name, target);
        };
    }

    /**
     * Test decorator
     * @param options
     * @returns {function(any): undefined}
     * @constructor
     */
    export function Test(options: any): any {
        return (target: any) => {
            options.tests = target;
            ngDescribe(options);
        }
    }
    /**
     * Inject decorator
     * @param dependencies names of dependencies to inject.
     * @returns {function(any, any): undefined}
     * @constructor
     */
    export function Inject(...dependencies: any[]): any {
        return (target: any, descriptor: any) => {
            // if it"s true then we injecting dependencies into function and not Class constructor
            if (descriptor) {
                const fn = target[descriptor];
                fn.$inject = dependencies;
            } else {
                target.$inject = dependencies;
            }
        };
    }

    /**
     * Convert dash-case to camelCase
     * @param string input
     * @returns {any|ILocationService|void}
     */
    function dashCaseToCamelCase(string: any) {
        return string.replace( /-([a-z])/ig, (all: any, letter: any) => letter.toUpperCase());
    }
}
