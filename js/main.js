const input = document.getElementById('inp');
const addTask = document.getElementById('btn');
const out = document.querySelector('.out');
const completed = document.querySelector('.completed');

function createListItem() {
    const li = document.createElement('li');
    li.setAttribute('job', 'false')
    // li.setAttribute('contenteditable', 'true')
    li.classList.add('item')

    console.log('li', li)

    return li;
}

function getCompletedItem(innerHTML) {
    const li = document.createElement('li');
    li.classList.add('completed-item')
    li.setAttribute('job', 'false')
    // li.setAttribute('contenteditable', 'true')
    li.innerHTML = innerHTML;

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
    out.prepend(li);
}

addTask.addEventListener('click', (e) => {
    if (input.value != "") {
        addToDo()
        input.value = '';
    }
    else {
        alert('Pls add the task')
    }
})

input.addEventListener('keypress', (e) => {
    if (input.value != "" && e.key == 'Enter') {
        addToDo()
        input.value = '';
    }

})

function completeToDo(element) {

    element.setAttribute('checked', 'checked')
    element.classList.toggle('checked')
    element.parentNode.querySelector(".text").classList.toggle('line_through')
    const html = element.parentNode.innerHTML;

    if (element.classList.contains('checked')) {
        let completedItem = document.querySelector('.checked').parentNode;
        out.append(getCompletedItem(html))
        completedItem.remove();
    }
    else {
        out.prepend(createListElement(element.parentNode.innerText))
        document.querySelector('.check-box').checked = false;
        element.classList.remove('line_through', 'checked')
        element.removeAttribute('checked')
        element.parentNode.remove()
    }
}

function removeToDO(element) {
    element.parentNode.remove()
}

out.addEventListener('click', (e) => {
    const element = e.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === 'complete') {
        completeToDo(element)
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
        createInput.setAttribute('job', 'false');
        createInput.value = textValue;
        text.innerText = '';
        text.append(createInput);
        createInput.focus();

        const getCheckBox = document.querySelectorAll('.check-box');
        getCheckBox.forEach((e) => {
            if (createInput) {
                e.setAttribute('disabled', 'disabled')
            }
        })

        createInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                getCheckBox.forEach((e) => {
                    e.removeAttribute('disabled')
                })
                text.innerText = createInput.value;
                editTask(text, text.innerText)
            }
        })

        document.addEventListener('click', (e) => {
            if (e.target != 'li') {
                getCheckBox.forEach((e) => {
                    e.removeAttribute('disabled')
                })

                text.innerText = createInput.value;
                editTask(text, text.innerText)

            }
        })
    })

}