function myFunction() {

    var dragged;

    document.addEventListener("dragstart", function (event) {
        // store a ref. on the dragged elem
        if(typeof event.target.data == 'string')
            dragged = event.target.parentNode;
        else
            dragged = event.target;
    }, false);
    /* events fired on the drop targets */
    document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function (event) {
        // highlight potential drop target when the draggable element enters it
        if (event.target.className == "dropzone" && (event.target.childNodes.length == 4)) {
            event.target.style.background = "black";
        }

    }, false);

    document.addEventListener("dragleave", function (event) {
        // reset background of potential drop target when the draggable element leaves it
        if ((event.target.className == "dropzone" || event.target.parentElement.className == "dropzone") && (event.target.childNodes.length == 4)) {
            if (event.target.className !== "tooltip") {
                event.target.style.background = "black";
            }
        }
        if (dragged.parentElement.className == "dropzone" && (event.target.childNodes.length == 4)) {
            dragged.parentElement.style.backgroundColor = "grey";
            console.log(dragged.parentElement.style.backgroundColor)
        }
    }, false);

    document.addEventListener("drop", function (event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.className == "dropzone" && dragged.className == 'draggable' && (event.target.childNodes.length == 3)) {
            event.target.style.background = "black";
            if (dragged.parentElement.className == "dropzone") {
                dragged.parentElement.style.backgroundColor = "grey";
            }
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
        // if selected drop target already contains an element
        else {
            if (dragged.parentElement.className == 'dropzone') {
                dragged.parentElement.style.backgroundColor = "black";
            }
        }

    }, false);

    document.addEventListener("mouseover", function (event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // render text in tool tip
        if (event.target.className == "dropzone") {
            for (child in event.target.childNodes) {
                if (event.target.childNodes[child].className == 'draggable') {
                    var dragged = child;
                }
                if (event.target.childNodes[child].className == 'tooltip') {
                    var tooltip = child;
                }
            }
            if (dragged) {
                event.target.childNodes[tooltip].innerText = event.target.childNodes[dragged].innerText;
            }
            else {
                event.target.childNodes[1].innerText = 'Vacant';
            }
        }
    }, false);
}