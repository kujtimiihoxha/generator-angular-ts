module <%= appModuleCamel %>.Routes {
    @Route("home",{ 
        url:"/",  
        templateUrl:"./views/routes/home/home.template.html"
    })
    class HomeRoute{
        constructor(){
        }
    }
}
