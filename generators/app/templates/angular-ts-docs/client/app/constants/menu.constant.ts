/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
module <%= appModuleCamel %>.Constants{
    export interface IMenuItem{
        state:string,
        name:string,
        order:number,
        children:IMenuItem[],
        addChild(child:IMenuItem):void
    }
    class MenuItem implements IMenuItem {
        state:string;
        name:string;
        order:number;
        children:<%= appModuleCamel %>.Constants.IMenuItem[];

        constructor( state:string, name:string, order:number, children?:<%= appModuleCamel %>.Constants.IMenuItem[]) {
            this.state = state;
            this.name = name;
            this.order = order;
            if(angular.isDefined(children)) {
                this.children = children;
            } else {
                this.children = [];
            }
        }
        public addChild(child:IMenuItem):void{
            this.children.push(child);
        }
    }
    @Constant("MenuConstant")
    class MenuConstant{
        items: IMenuItem[];
        constructor(){
            this.items=[];
            this.items.push(new MenuItem('angularTypescript.quickStart','Angular Typescript',1));
            this.items.push(new MenuItem('gettingStarted.install','Getting Started',2));
            this.items.push(new MenuItem('generators.component','Generators',3));
            this.items.push(new MenuItem('decorators.component','Decorators',4));
            //Angular Typescript children
            this.items[0].addChild(new MenuItem('angularTypescript.quickStart','Quick Start',1));
            this.items[0].addChild(new MenuItem('angularTypescript.features','Features',2));
            this.items[0].addChild(new MenuItem('angularTypescript.credits','Credits',3));
            //Getting Started children
            this.items[1].addChild(new MenuItem('gettingStarted.install','Install',1));
            this.items[1].addChild(new MenuItem('gettingStarted.usage','Usage',2));
            //Generators children
            this.items[2].addChild(new MenuItem('generators.component','Component',2));
            this.items[2].addChild(new MenuItem('generators.config','Config',3));
            this.items[2].addChild(new MenuItem('generators.constant','Constant',4));
            this.items[2].addChild(new MenuItem('generators.directive','Directive',5));
            this.items[2].addChild(new MenuItem('generators.filter','Filter',6));
            this.items[2].addChild(new MenuItem('generators.route','Route',7));
            this.items[2].addChild(new MenuItem('generators.run','Run',8));
            this.items[2].addChild(new MenuItem('generators.service','Service',9));
            //Decorators children
            this.items[3].addChild(new MenuItem('decorators.component','@Component',1));
            this.items[3].addChild(new MenuItem('decorators.config','@Config',1));
            this.items[3].addChild(new MenuItem('decorators.constant','@Constant',1));
            this.items[3].addChild(new MenuItem('decorators.directive','@Directive',1));
            this.items[3].addChild(new MenuItem('decorators.filter','@Filter',1));
            this.items[3].addChild(new MenuItem('decorators.route','@Route',1));
            this.items[3].addChild(new MenuItem('decorators.run','@Run',1));
            this.items[3].addChild(new MenuItem('decorators.service','@Service',1));
            this.items[3].addChild(new MenuItem('decorators.inject','@Inject',1));
        }
    }
}
