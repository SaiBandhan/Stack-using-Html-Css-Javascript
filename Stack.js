// Variable Declaration
const pushButton = document.querySelector(".push");
const popButton = document.querySelector(".pop");
const resetButton = document.querySelector(".reset");
const stackContainer = document.querySelector(".main-stack-bucket");
const inputField = document.querySelector(".text");
const messageBox = document.querySelector(".massage-box");
const messageElement = document.querySelector(".massage");
const topBox = document.querySelector(".box:nth-child(1)");
const lastPushedBox = document.querySelector(".box:nth-child(2)");
const lastPoppedBox = document.querySelector(".box:nth-child(3)");
const sizeBox = document.querySelector(".box:nth-child(4)");
const stack = [];

// Disable all buttons
const disableButtons = () => {
    pushButton.disabled = true;
    pushButton.classList.add("disable-button");
    popButton.disabled = true;
    popButton.classList.add("disable-button");
    resetButton.disabled = true;
    resetButton.classList.add("disable-button");
    inputField.disabled = true;
};

// Enable all buttons
const enableButtons = () => {
    pushButton.disabled = false;
    pushButton.classList.remove("disable-button");
    popButton.disabled = false;
    popButton.classList.remove("disable-button");
    resetButton.disabled = false;
    resetButton.classList.remove("disable-button");
    inputField.disabled = false;
};

// When the push button is clicked
pushButton.addEventListener("click", () => {
    const inputValue = inputField.value.trim();

    if (inputValue === "") {
        messageElement.textContent = "Please enter a value.";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    if (stack.length === 5) {
        inputField.value = "";
        messageElement.textContent = "Stack Overflow";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    stack.push(inputValue);

    const element = document.createElement("div");
    element.classList.add("ele");
    element.textContent = stack[stack.length - 1];
    stackContainer.appendChild(element);

    topBox.textContent = stack[stack.length - 1];
    inputField.value = "";

    element.classList.add("ele-add");

    disableButtons();

    setTimeout(() => {
        element.classList.remove("ele-add");
        lastPushedBox.textContent = inputValue;
        messageElement.textContent = `Item ${stack[stack.length - 1]} is Pushed.`;
        enableButtons();
    }, 1500);
});

// When the pop button is clicked
popButton.addEventListener("click", () => {
    if (stack.length === 0) {
        messageBox.classList.add("error-message");
        messageElement.textContent = "Stack Underflow";
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    stackContainer.lastElementChild.classList.add("ele-remove");

    disableButtons();

    setTimeout(() => {
        stackContainer.removeChild(stackContainer.lastElementChild);

        const poppedValue = stack.pop();

        lastPoppedBox.textContent = poppedValue;

        if (stack.length === 0) {
            topBox.textContent = "";
        } else {
            topBox.textContent = stack[stack.length - 1];
        }

        messageElement.textContent = `Item ${poppedValue} is Popped.`;
        enableButtons();
    }, 1500);
});

// When the reset button is clicked
resetButton.addEventListener("click", () => {
    stack.length = 0;
    topBox.textContent = "";
    lastPushedBox.textContent = "";
    lastPoppedBox.textContent = "";
    messageElement.textContent = "";

    while (stackContainer.firstChild) {
        stackContainer.removeChild(stackContainer.firstChild);
    }
});