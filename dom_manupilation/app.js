function submit() {
  var selectBox = document.getElementById("select");
  var selectedOption = selectBox.options[selectBox.selectedIndex].value;

  var colorPicker = document.getElementById("color").value;
  var textArea = document.getElementById("textarea").value;

  var newElement = document.createElement(selectedOption);
  newElement.style.color = colorPicker;
  newElement.textContent = textArea;
  addEditAndDeleteOptions(newElement);

  document.querySelector(".main-container").appendChild(newElement);
}

function createEditButton(element) {
  var editButton = document.createElement("span");
  editButton.classList.add("edit");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    var colorPicker = document.getElementById("color");
    var textArea = document.getElementById("textarea");

    colorPicker.value = element.style.color;
    textArea.value = element.textContent;

    colorPicker.disabled = false;
    textArea.disabled = false;
  });

  return editButton;
}

function createDeleteButton(element) {
  var deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    element.parentNode.removeChild(element);
  });

  return deleteButton;
}

function addEditAndDeleteOptions(element) {
  var editButton = createEditButton(element);
  var deleteButton = createDeleteButton(element);

  element.appendChild(editButton);
  element.appendChild(deleteButton);

  element.addEventListener("mouseenter", function () {
    editButton.style.display = "inline";
    deleteButton.style.display = "inline";
  });

  element.addEventListener("mouseleave", function () {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  });
}