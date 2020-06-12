/*
 * Implement all your JavaScript in this file!
 */

// declare variables
var displayStr = "";
var prevOp = "";
var Op = "";
var num1 = 0;
var num2 = 0;
var outlist = [];

// do Operations function
function doOperation(num1,num2,Op,prevOp,curID){
    if(Op==='add' && prevOp!=='add'){
        if(prevOp==='eqs' && curID!=='equalsButton'){
            num2 = 0;
            return ([num1, num2, displayStr]);
        }
        displayStr = (num1+num2).toString();
        $("input[name='display']").val(Number(displayStr));
        num1 = Number(displayStr); // reset num1
        num2 = 0;
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        displayStr = "";
        return ([num1, num2, displayStr]);
    }
    else if(Op==='subtract' && prevOp!=='subtract'){
        if(prevOp==='eqs' && curID!=='equalsButton'){
            num2 = 0;
            return ([num1, num2, displayStr]);
        }
        displayStr = (num1-num2).toString();
        $("input[name='display']").val(Number(displayStr));
        num1 = Number(displayStr); // reset num1
        num2 = 0;
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        displayStr = "";
        return ([num1, num2, displayStr]);
    }
    else if(Op==='multiply' && prevOp!=='multiply'){
        if(prevOp==='eqs' && curID!=='equalsButton'){
            num2 = 0;
            return ([num1, num2, displayStr]);
        }
        displayStr = (num1*num2).toString();
        $("input[name='display']").val(Number(displayStr));
        num1 = Number(displayStr); // reset num1
        num2 = 0;
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        displayStr = "";
        return ([num1, num2, displayStr]);
    }
    else if(Op==='divide' && prevOp!=='divide'){
        if(prevOp==='eqs' && curID!=='equalsButton'){
            num2 = 0;
            return ([num1, num2, displayStr]);
        }
        displayStr = (num1/num2).toString();
        $("input[name='display']").val(Number(displayStr));
        num1 = Number(displayStr); // reset num1
        num2 = 0;
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        displayStr = "";
        return ([num1, num2, displayStr]);
    }
    else{
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        displayStr = "";
        return ([num1, num2, displayStr]);
    }
}


// if an operations buttons is pressed
$("button[class='op']").click(function(){
    if (this.id === 'addButton'){ // if addButton   
        outlist = doOperation(num1,num2,Op,prevOp,this.id);
        num1 = outlist[0];
        num2 = outlist[1];
        displayStr = outlist[2];
        prevOp = Op;
        Op = 'add';
    }
    else if (this.id === 'subtractButton'){
        outlist = doOperation(num1,num2,Op,prevOp,this.id);
        num1 = outlist[0];
        num2 = outlist[1];
        displayStr = outlist[2];
        prevOp = Op;
        Op = 'subtract';
    }
    else if (this.id === 'multiplyButton'){
        outlist = doOperation(num1,num2,Op,prevOp,this.id);
        num1 = outlist[0];
        num2 = outlist[1];
        displayStr = outlist[2];
        prevOp = Op;
        Op = 'multiply';
    }
    else if (this.id === 'divideButton'){
        outlist = doOperation(num1,num2,Op,prevOp,this.id);
        num1 = outlist[0];
        num2 = outlist[1];
        displayStr = outlist[2];
        prevOp = Op;
        Op = 'divide';
    }
    else if (this.id === 'equalsButton'){
        outlist = doOperation(num1,num2,Op,prevOp,this.id);
        num1 = outlist[0];
        displayStr = outlist[2];
        prevOp = "eqs";
    }
})


// if clear button is pressed
$("button[id='clearButton']").click(function(){
    displayStr = "";
    prevOp = "";
    Op = "";
    num1 = 0;
    num2 = 0;
    outlist = [];
    $("input[name='display']").val(Number(displayStr));
    //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());   
})
                              

// if a number button is pressed
$("button[class='num']").click(function(){
    if(Op===""){
        displayStr += $(this).val();
        num1 = Number(displayStr);
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        $("input[name='display']").val(num1);
        clearDisplay = false;
    }

    else{
        displayStr += $(this).val();
        num2 = Number(displayStr);
        //$("#output").html(displayStr+','+num1.toString()+','+ num2.toString());
        $("input[name='display']").val(num2);
        clearDisplay = false; 
        prevOp = "numInput";
    }
})
    
