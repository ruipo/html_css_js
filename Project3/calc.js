/*
 * Implement all your JavaScript in this file!
 */

var clearDisplay = false;
var displayStr = "";
var operate = false;
var prevOp = "";
var num1 = 0;
var num2 = 0;
var ans = 0;

$('button').click(function(){
    if (this.id === "addButton"){ // if addButton
        
        if (prevOp!== "addButton"){ // if prev click is not add button
            num1 = num2;
            if (displayStr){
                 num2 = Number(displayStr);    
            }

            displayStr = (num1+num2).toString(); // add
            $("input[name='display']").val(Number(displayStr));
            num2 = Number(displayStr); // reset num2 
            $("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
            operate = true; // operation in progress
            clearDisplay = true;
            prevOp = this.id;
        }
        
        else{
            operate = true; // operation still in progress
        }
    }
    
    else if (this.id === "subtractButton"){ // if addButton
        
        if (prevOp!== "subtractButton"){ // if prev click is not add button
            num1 = num2;
            if (displayStr){
                num2 = Number(displayStr);  
                displayStr = (num1-num2).toString(); // add
                $("input[name='display']").val(Number(displayStr));
                num2 = Number(displayStr); // reset num2 
                $("#output").html(displayStr+','+num1.toString()+','+ num1.toString());
                operate = true; // operation in progress
                clearDisplay = true;
            }
            
            else{
               $("input[name='display']").val('-'); 
            }



            prevOp = this.id;
        }
        
        else{
            operate = true; // operation still in progress
        }
    }
    
    else if (this.id === "multiplyButton"){ // if addButton
        
        if (prevOp!== "multiplyButton"){ // if prev click is not add button
            num1 = num2;
            if (displayStr){
                 num2 = Number(displayStr);    
            }

            displayStr = (num1*num2).toString(); // add
            $("input[name='display']").val(Number(displayStr));
            num2 = Number(displayStr); // reset num2 
            $("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
            operate = true; // operation in progress
            clearDisplay = true;
            prevOp = this.id;
        }
        
        else{
            operate = true; // operation still in progress
        }
    }    

    else if (this.id === "divideButton"){ // if addButton
        
        if (prevOp!== "divideButton"){ // if prev click is not add button
            num1 = num2;
            if (displayStr){
                 num2 = Number(displayStr);    
            }

            displayStr = (num1/num2).toString(); // add
            $("input[name='display']").val(Number(displayStr));
            num2 = Number(displayStr); // reset num2 
            $("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
            operate = true; // operation in progress
            clearDisplay = true;
            prevOp = this.id;
        }
        
        else{
            operate = true; // operation still in progress
        }
    }
    
    if (clearDisplay){
        displayStr = "";
    }
    
    if(!operate){ // if not an operation button
        displayStr += $(this).val();
        $("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        $("input[name='display']").val(Number(displayStr));
        clearDisplay = false;
        prevOp = "";
    }
    
    operate = false;
})