/*
    Calculator in Vanilla JS
    -Broken functions have the button disabled on the calculator.
    -Only works for single digits right now (ie. 9 * 9 = 81), need to figure this out.
    
*/
(function() {

    /* The Calculator function exposes only one method, init(), to the outside closure */
    function Calculator() {

        /* We pass init() only one parameter. This is the id of the calculator container */
        function init(theCalculator) {

            /* If the proper id is not sent to init(), just stop the program */
            if (document.getElementById(theCalculator) === null) {
                console.log('The JavaScript is not working. Please check the id of the calculator.');
                document.getElementById('wrongID').style="display: block !important;";
                return;
            }

            var output = document.getElementById('displayOutput'),
                equation = document.getElementById('displayEquation'),
                solution = '',
                firstNumber = '',
                secondNumber = '',
                currentOperator = '';

            output.innerHTML = '0';

            /* Get all of the operands (0-9) by selecting the class. */
            var operandList = document.getElementsByClassName('operand');

            /* Traverse the list of operands and use let for block scoping. Listen for clicks on operands,
               and then pass that value to start the calculation.  */
            for (var i = 0; i < operandList.length; i++) {
                let j = i;
                operandList[j].addEventListener('click', function() {
                    operand(operandList[j]);

                }, false);
            }

            /* Traverse the list of operators. */
            var operatorList = document.getElementsByClassName('operator');

            for (var j = 0; j < operatorList.length; j++) {
                let k = j;
                operatorList[k].addEventListener('click', function() {
                    operator(operatorList[k]);
                }, false);
            }

            function operator(whichOperator) {

                if (firstNumber === '') {
                    console.log('First number cannot be blank.');
                    return;
                }

                /* Use this switch statement to set the currentOperator based on whichever one the
                   user clicks last */
                switch (whichOperator.id) {

                    case 'equalsButton':
                        console.log('solution: ' + solution);
                        currentOperator = '=';
                        output.innerHTML = solution;
                        firstNumber = solution;
                        secondNumber = '';
                        break;

                    case 'addButton':
                        console.log('+');
                        currentOperator = '+';
                        break;

                    case 'subtractButton':
                        console.log('-');
                        currentOperator = '-';
                        break;

                    case 'divideButton':
                        console.log('/');
                        currentOperator = '/';
                        break;

                    case 'multiplyButton':
                        console.log('*');
                        currentOperator = '*';
                        break;

                    case 'clearButton':
                        console.log('clear');
                        currentOperator = 'C';
                        clear();
                        break;

                }

                /* Append the operator to the equation that shows at the top of the display window. 
                   Exclude the equals sign */
                if (whichOperator.id != 'equalsButton') {
                    equation.innerHTML += ' ' + currentOperator;
                }

            }

            function clear() {
                firstNumber = '';
                secondNumber = '';
                currentOperator = '';
                solution = '';
                equation.innerHTML = '';
                output.innerHTML = '0';
            }

            function operand(whichOperand) {
                if (firstNumber === '') {
                    firstNumber = parseInt(whichOperand.firstChild.innerHTML);
                    equation.innerHTML += ' ' + firstNumber;
                    console.log('first number is : ' + firstNumber);
                } else {
                    secondNumber = parseInt(whichOperand.firstChild.innerHTML);
                    equation.innerHTML += ' ' + secondNumber;
                    console.log('second number is : ' + secondNumber);

                    /* If we have a currentOperator, compute using the first and second numbers */
                    if (currentOperator !== '') {
                        compute();
                    }
                }

            }

            /* The compute method is called whenever we are sure to have 2 numbers and a currentOperator. */
            function compute() {
                switch (currentOperator) {

                    case '+':
                        solution = firstNumber + secondNumber;
                        break;

                    case '-':
                        solution = firstNumber - secondNumber;
                        break;

                    case '*':
                        solution = firstNumber * secondNumber;
                        break;

                    case '/':
                        solution = firstNumber / secondNumber;
                        break;

                }
            }

        }

        return {
            init: init
        };
    }

    /* Create an instance of the Calculator module. Now the reference myCalc has access
       to only one function, init()  */
    var myCalc = Calculator();
    myCalc.init('theCalculator');

})();