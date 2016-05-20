/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Directives{
    @Directive("menu-item",{
        restrict: 'A',
        scope:{
            children:'<children'
        }
    })
    @Inject("$compile","$rootScope","$filter")
    class MenuItemDirective{
        children:any;
        constructor(private compile:ng.ICompileService, private rootScope:any ,private filter:any){ }
        cleanMenus(parent:any){
        let children=parent.children('li');
        children.each((child:any)=>{
            if($(children[child]).children('ul').length > 0){
                $(children[child]).children('ul').remove();
            }
        });

    }
        toggle(){
            document.getElementById('toggle-drawer').checked = false;
            document.body.classList.remove('toggle-drawer');
        }
        static  link(scope:any, element:ng.IRootElementService) {
            element.on('click',()=>{
                scope.vm.cleanMenus($(element).parent('ul'));
                let subMenu = `<ul>`;
                scope.children.forEach((child:any)=>{
                    subMenu = subMenu + `
                                        <li class="anchor">
                                            <a ui-sref-active="current" title="${child.name}" ui-sref="${child.state}" ng-click="vm.toggle()">
                                                ${child.name}
                                            </a>
                                        </li>`
                });
                subMenu = subMenu +'</ul>';
                $(element).append(scope.vm.compile(subMenu)(scope,()=>{}));
            });
            scope.vm.rootScope.$on('$stateChangeSuccess',
                function(event:any, toState:any){
                    scope.children = scope.vm.filter('orderBy')(scope.children, 'order');
                    scope.children.forEach((child:any)=>{
                        if(child.state === toState.name){
                            scope.vm.cleanMenus($(element).parent('ul'));
                            let subMenu = `<ul>`;
                            scope.children.forEach((child:any)=>{
                                subMenu = subMenu + `
                                        <li class="anchor">
                                            <a ui-sref-active="current" title="${child.name}" ui-sref="${child.state}" ng-click="vm.toggle()">
                                                ${child.name}
                                            </a>
                                        </li>`
                            });
                            subMenu = subMenu +'</ul>';
                            $(element).append(scope.vm.compile(subMenu)(scope,()=>{}));
                        }
                    })
                });

        }
    }

}
