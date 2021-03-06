// Budget Controller module 
var budgetController=(function(){

    // Constructor of Expense
    var Expense=function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };

    // Use expense prototype for calculates expense percentages
    Expense.prototype.calcPercentage=function(totalIncome){
        
        if(totalIncome > 0){
            this.percentage= Math.round((this.value/totalIncome)*100);
        }else{
            this.percentage=-1;
        }

    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
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
        },
        budget:0,
        percentage:-1
    };

    // function for calculate total
    var calculateTotal=function(type){
        var sum=0;
        data.allItems[type].forEach(function(curr){
            sum+=curr.value;
        });
        data.totals[type] = sum;
    };

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

        // Delete an item from Budget
        deleteItem: function(type, id){
            var ids, index;
            
            // id =6
            // ids=[1 2 4 6 8]
            // index=3

            // map() method returns new array
            ids=data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        // To calculate the budget
        calculateBudget: function(){

            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expense
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent
            if(data.totals.inc >0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
            }else{
                data.percentage=-1;
            }

        },

        calculatePercentages: function(){
            /*
            a=20
            b=10
            c=40
            total income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function(){
            var allPerc=data.allItems.exp.map(function(cur){  // map method return new array 
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function(){
            console.log(data);
        }

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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel:'.budget__title--month'
    }

    var formatNumber= function(num, type){
        var numSplit, int, dec, type;
        /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands

        2310.4567 -> + 2,310.46
        2000 -> + 2,000.00
        */

        num = Math.abs(num);
        num = num.toFixed(2);   // put up to 2 decimal number and return string

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach=function(list, callback){
        for(var i=0; i<list.length;i++){
            callback(list[i], i);
        }
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
                // Hard coded HTML
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element=DOMStrings.expensesContainer;
                // (html code from index file) ,Hard coded HTML
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder with actual data
            newHTML=html.replace('%id%', obj.id);
            newHTML=newHTML.replace('%description%', obj.description);
            newHTML=newHTML.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

        },

        // Remove item from UI
        deleteListItem: function(selectorID){
            // first select element move up to select parent and again select element and remove as child
            // document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID));
            var el=document.getElementById(selectorID);
            el.parentNode.removeChild(el);

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

        // Display Budget on UI
        displayBudget: function(obj){

            var type;
            obj.budget > 0 ? type='inc' : type='exp';

            document.querySelector(DOMStrings.budgetLabel).textContent=formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent=formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent=formatNumber(obj.totalExp, 'exp');

            // document.querySelector(DOMStrings.percentageLabel).textContent=obj.percentage;
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent=obj.percentage + '%';
            }else{
                document.querySelector(DOMStrings.percentageLabel).textContent="---";
            }
        },

        displayPercentages: function(percentages){
            
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel); // It will return a node List and node list does not have forEach method

            nodeListForEach(fields, function(current, index){

                if(percentages[index]>0){
                    current.textContent=percentages[index]+'%';
                }else{
                    current.textContent='---';
                }

            });

        },

        displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function(){

            // Select Class names separate by comma
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');

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

        // Add event delegation on common container
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    // Get DOM Strings t make our code easy
    // var DOM = UIController.getDOMStrings();

    // Calculate the budget and display the budget on the UI
    var updateBudget=function(){

        //4. Calculate the budget
        budgetCtrl.calculateBudget();

        // Return the budget
        var budget = budgetCtrl.getBudget();

        // 5. Display the budget on the UI
        UIController.displayBudget(budget);

    };

    // Update percentages
    updatePercentages=function(){

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget Controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        // console.log(percentages);
        UICtrl.displayPercentages(percentages);
        

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

            // 6. Calculate and update percentages
            updatePercentages();
        }    
    }

    // Function for delete item
    var ctrlDeleteItem=function(event){
        var itemID, splitID, type, ID;
        // Traverse up in DOM to reach main container element and get their id
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            splitID=itemID.split('-');
            type=splitID[0];
            ID=parseInt(splitID[1]);
        }
        // 1. Delete the item from the data Structure
            budgetCtrl.deleteItem(type, ID);
        // 2. Delete the item from UI
            UICtrl.deleteListItem(itemID);
        // 3. Update and show the new budget;
            updateBudget();

         // 4. Calculate and update percentages
            updatePercentages();
        
    };

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
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

}) (budgetController, UIController);

controller.init();