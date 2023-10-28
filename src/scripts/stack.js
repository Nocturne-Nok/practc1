

console.log("hello");


//document.writeln("ssssssssssssssssss");
let stack1 = "";
let N = 12;

function PushOur() {

    if (stack1.split(", ").length  <= N) {
        a = document.getElementById("pushValue").value;
        stack1 = stack1 + ", " + a;
        console.log(stack1);
        document.getElementById("displayStack").textContent = stack1;
    }
    else
    {
        alert("stack full");
    }
}

function PopOur() {

    if ( ! (stack1.split(', ').length  === 1)) {
        let tmpStack = "";
        alert("Pop element " + stack1.split(', ') [stack1.split(', ').length - 1]);

        for (let i = 1; i < stack1.split(', ').length - 1; i++) {
            tmpStack += ', ' + stack1.split(', ')[i];
        }


        stack1 = tmpStack;
        console.log(stack1);
        document.getElementById("displayStack").textContent = stack1;
    }
    else
    {
        alert("Stack empty");
    }
}


function SizeOur() {
    alert("Size stack " + (stack1.split(', ').length - 1));
}

function ClearOur() {
    stack1 = "";
    document.getElementById("displayStack").textContent = stack1;
    alert("Cleared ");
}