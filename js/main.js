const input = document.getElementById('inp');
const addTask = document.getElementById('btn');
const out = document.querySelector('.out');
const completed = document.querySelector('.completed');

function getCompletedItem(innerHTML) {
    const li = document.createElement('li');
    li.classList.add('completed-item')
    li.setAttribute('job', 'false')
    // li.setAttribute('contenteditable', 'true')
    li.innerHTML = innerHTML;
    return li;
}

function createListItem() {
    const li = document.createElement('li');
    li.setAttribute('job', 'false')
    // li.setAttribute('contenteditable', 'true')
    li.classList.add('item')

    console.log('li', li)

    return li;
}

function createCheckbox() {
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add("check-box");
    checkBox.setAttribute('job', 'complete')

    console.log('checkBox', checkBox)

    return checkBox;
}

function createIcon() {
    const icon = document.createElement('i')
    icon.classList.add("fa", "fa-trash-o", "de")
    icon.setAttribute('job', 'delete')

    console.log('icon', icon)

    return icon;
}

function createText(listElementText) {
    const text = document.createElement('p');
    text.classList.add('text');
    text.setAttribute('job', 'false')
    text.innerText = listElementText;

    editTask(text, listElementText)

    console.log('text', text)
    return text;
}

function createListElement(listElementText) {
    const checkBox = createCheckbox();
    const icon = createIcon();
    const text = createText(listElementText)
    const li = createListItem();

    li.append(checkBox, text, icon);

    return li;
}

function addToDo() {
    const inputValue = input.value;

    const li = createListElement(inputValue)
    console.dir(li)
    out.appendChild(li);
}

addTask.onclick = function () {
    if (input.value != "") {
        addToDo()
        input.value = '';
    }
    else {
        alert('Pls add the task')
    }
}

function completeToDo(element) {

    element.setAttribute('checked', 'checked')
    element.classList.toggle('checked')
    element.parentNode.querySelector(".text").classList.toggle('line_through')
    const html = element.parentNode.innerHTML;

    if (element.classList.contains('checked')) {
        let completedItem = document.querySelector('.checked').parentNode;
        out.append(getCompletedItem(html))
        console.log(completedItem)
        completedItem.remove();

    }
    else {
        out.prepend(getCompletedItem(element.parentNode.innerHTML))
        document.querySelector('.check-box').checked = false;
        element.classList.remove('line_through', 'checked')
        element.removeAttribute('checked')
        element.parentNode.remove()

    }
}

function removeToDO(element) {
    console.log(element.parentNode)
    element.parentNode.remove()
}

out.addEventListener('click', (e) => {
    const element = e.target;
    const elementJob = element.attributes.job.value;
    if (elementJob === 'complete') {
        completeToDo(element)
        console.log(element)
    }
    else if (elementJob === 'delete') {
        removeToDO(element)
    }
})

function editTask(text, listElementText) {
    const textValue = listElementText

    text.addEventListener('dblclick', (e) => {

        const createInput = document.createElement('input')
        createInput.classList.add('input_inner_task')
        createInput.setAttribute('type', 'text');
        createInput.value = textValue;
        text.innerText = '';
        text.append(createInput);
        createInput.focus();

        createInput.addEventListener('keydown', (e) => {

            if (e.keyCode === 13) {
                text.innerText = createInput.value;
            }
        })

    })
}