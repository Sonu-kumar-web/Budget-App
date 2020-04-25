// Budget Controller module 
var budgetController=(function(){

    // Constructor of Expense
    var Expense=function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    // Constructor of Income
    var Income=function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    // Store all income and expenses into array
    // var allExpenses=[];
    // var allIncomes=[];
    // var totalExpenses=0;

    // it is good to create object for store data (This is my data structure)
    var data= {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    //  For Public access  
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            // [1 2 3 4 5], next ID=6
            // [1 2 3 6 8], next ID=9
            // ID = LastID + 1
            // Create new ID
            if(data.allItems[type].length > 0){
                ID=data.allItems[type][data.allItems[type].length-1].id + 1;
            }else{
                ID=0;
            }
            
            // Create new Item based on 'inc' and 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push new Item into data structure
            data.allItems[type].push(newItem);

            // return the new Item
            return newItem;
        },
        
    };

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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
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
                // value: document.querySelector(DOMStrings.inputValue).value
                //Convert String into float
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
                
            };
        //     var type=document.querySelector('.add__type').value; // value will be either inc or exp not + or -
        //     var description=document.querySelector('.add__description').value;
        //     var value=document.querySelector('.add__value').value;
        },

        addListItem: function(obj, type){
            var html, newHTML, element;
            // Create HTML string with placeholder text (html code from index file)
            if(type === 'inc'){
                element=DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element=DOMStrings.expensesContainer;
                // (html code from index file)
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder with actual data
            newHTML=html.replace('%id%', obj.id);
            newHTML=newHTML.replace('%description%', obj.description);
            newHTML=newHTML.replace('%value%', obj.value)
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

        },

        // Clear the input values from UI
        clearFields: function() {
            var fields, fieldsArr;
            // querySelectorAll returns list
            fields=document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr=Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value="";
            });
            //  Set the focus on the first element of the array(At input description )
            fieldsArr[0].focus();
        },

        // Exposing our DOM string object to public
        getDOMStrings: function(){
            return DOMStrings;
        }

    }

}) ();



// Global App Controller Module It will connect to both module to control them
var controller=(function(budgetCtrl, UICtrl){

    // Function for setup event Listeners
    var setupEventListeners = function(){

        // Get DOM Strings t make our code easy
        var DOM = UIController.getDOMStrings();
        
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
    }

    // Get DOM Strings t make our code easy
    // var DOM = UIController.getDOMStrings();

    // Calculate the budget and display the budget on the UI
    var updateBudget=function(){
        //4. Calculate the budget

        // Return the budget

        // 5. Display the budget on the UI

    };

    var ctrlAddItem=function(){
        var input, newItem;

        //1. get the field input data
        input=UICtrl.getInput();
        
        // To prevent false Input
        if(input.description !== "" && !isNaN(input.value) && input.value>0){

            //2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            
            //3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);

            // Clear the field
            UICtrl.clearFields();

            // 4 and 5 are written in a separate function to follow DRy principal
            //4. Calculate the budget
            // 5. Display the budget on the UI
            // Calculate and update budget
            updateBudget();
        }    
    }

    // document.querySelector('.add__btn').addEventListener('click', function(){

        //1. get the field input data

        //2. Add item to the budget controller
        
        //3. Add item to the UI

        //4. Calculate the budget
        
        // 5. Display the budget on the UI
        
    // });
    // document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);


    // Handle keyboard event
    // document.addEventListener('keypress',function(event){
    //     if(event.keyCode === 13 || event.which === 13){
            // console.log('Enter was pressed');
    //         ctrlAddItem();
            //1. get the field input data

            //2. Add item to the budget controller
        
            //3. Add item to the UI

            //4. Calculate the budget
        
            // 5. Display the budget on the UI
    //     }
        
    // });

    /*var z=budgetCtrl.publicTest(10);

    return {
        anotherPublicMethod: function(){
                            console.log(z);
            
        }
    }*/

    return {
        init: function(){
            console.log('Application started');
            setupEventListeners();
        }
    };

}) (budgetController, UIController);

controller.init();