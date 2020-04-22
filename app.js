// Budget Controller module 
var budgetController=(function(){
    // all functions and variable are private because of IIFE except return object
    var x=23;
    var add=function(a){
        return x+a;
    }

    // all functions inside return object are public and due to closure property it can easily access all 
    // function and variables.
    return {
        publicTest: function(b){
            return add(b);
        }
    }

}) ();


// UI Controller module
var UIController=(function(){

    // Some code

}) ();


// App Controller Module It will connect to both module to control them
var controller=(function(budgetCtrl, UICtrl){

    var z=budgetCtrl.publicTest(10);

    return {
        anotherPublicMethod: function(){
                            console.log(z);
            
        }
    }

}) (budgetController, UIController);