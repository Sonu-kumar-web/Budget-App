// Budget Controller module 
var budgetController=(function(){
    /* all functions and variable are private because of IIFE except return object
    var x=23;
    var add=function(a){
        return x+a;
    }

    all functions inside return object are public and due to closure property it can easily access all 
    function and variables.
    return {
        publicTest: function(b){
            return add(b);
        }
    }*/

}) ();


// UI Controller module
var UIController=(function(){

    // Some code

}) ();


// Global App Controller Module It will connect to both module to control them
var controller=(function(budgetCtrl, UICtrl){

    var ctrlAddItem=function(){
        //1. get the field input data

        //2. Add item to the budget controller
        
        //3. Add item to the UI

        //4. Calculate the budget
        
        // 5. Display the budget on the UI
        console.log('Its Work');
        
    }

    // document.querySelector('.add__btn').addEventListener('click', function(){

        //1. get the field input data

        //2. Add item to the budget controller
        
        //3. Add item to the UI

        //4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    // });
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    // Handle keyboard event
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            // console.log('Enter was pressed');
            ctrlAddItem();
            //1. get the field input data

            //2. Add item to the budget controller
        
            //3. Add item to the UI

            //4. Calculate the budget
        
            // 5. Display the budget on the UI
        }
        
    });

    /*var z=budgetCtrl.publicTest(10);

    return {
        anotherPublicMethod: function(){
                            console.log(z);
            
        }
    }*/

}) (budgetController, UIController);