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
    // Create a object to make our code easily changeable
    var DOMStrings={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    // Exposed Object
    return {
        getInput: function(){
            // return object that contains all three values
            return {
                // type: document.querySelector('.add__type').value, // value will be either inc or exp not + or -
                // description: document.querySelector('.add__description').value,
                // value: document.querySelector('.add__value').value
                type: document.querySelector(DOMStrings.inputType).value, 
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        //     var type=document.querySelector('.add__type').value; // value will be either inc or exp not + or -
        //     var description=document.querySelector('.add__description').value;
        //     var value=document.querySelector('.add__value').value;
        },

        // Exposing our DOM string object to public
        getDOMStrings: function(){
            return DOMStrings;
        }

    }

}) ();



// Global App Controller Module It will connect to both module to control them
var controller=(function(budgetCtrl, UICtrl){

    // Get DOM Strings t make our code easy
    var DOM = UIController.getDOMStrings();

    var ctrlAddItem=function(){
        //1. get the field input data
        var input=UICtrl.getInput();
        console.log(input);
        
        //2. Add item to the budget controller
        
        //3. Add item to the UI

        //4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    }

    // document.querySelector('.add__btn').addEventListener('click', function(){

        //1. get the field input data

        //2. Add item to the budget controller
        
        //3. Add item to the UI

        //4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    // });
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

    
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