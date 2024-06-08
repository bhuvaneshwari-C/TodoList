
document.addEventListener('DOMContentLoaded', () => {
    const toDoInput = document.getElementById('toDoInput');
    const addButton = document.getElementById('addButton');
    const toDoList = document.getElementById('toDoList');
    const completedList = document.getElementById('completedList');

    addButton.addEventListener('click', () => {
        if (toDoInput.value.trim() !== '') {
            addToDoItem(toDoInput.value);
            toDoInput.value = '';
            saveToDoItems();
        }
    });

    function addToDoItem(text, isComplete = false) {
        const li = createToDoItemElement(text, isComplete);
        if (isComplete) {
            completedList.appendChild(li);
        } else {
            toDoList.appendChild(li);
        }
    }



function createToDoItemElement(text, isComplete) {
    const li = document.createElement('li');
    li.style.position = 'relative';
    li.style.paddingRight = '100px'; 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isComplete;
    checkbox.addEventListener('change', () => {
        toggleComplete(li, checkbox.checked);
        saveToDoItems();
    });


    const span = document.createElement('span');
    span.textContent = text;


    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.right = '10px'; 
    buttonContainer.style.top = '50%';
    buttonContainer.style.transform = 'translateY(-50%)';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '5px';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className='edit-button';
    editButton.addEventListener('click', () => {
        editToDoItem(li);
    });


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className='delete-button';
    deleteButton.addEventListener('click', () => {
        deleteToDoItem(li);
        saveToDoItems();
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonContainer);

    return li;
}

    function editToDoItem(li) {
        const span = li.querySelector('span');
        const newText = prompt('Edit your item:', span.textContent);
        if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
            saveToDoItems();
        }
    }
    function deleteToDoItem(li) {
        li.remove();
        saveToDoItems();
    }

    function toggleComplete(li, isComplete) {
        if (isComplete) {
            li.classList.add('completed');
            completedList.appendChild(li);
        } else {
            li.classList.remove('completed');
            toDoList.appendChild(li);
        }
    }
    function saveToDoItems() {
        const toDoItems = [];
        const completedItems = [];

        toDoList.querySelectorAll('li').forEach(li => {
            toDoItems.push({
                text: li.querySelector('span').textContent,
                isComplete: false
            });
        });

        completedList.querySelectorAll('li').forEach(li => {
            completedItems.push({
                text: li.querySelector('span').textContent,
                isComplete: true
            });
        });


        localStorage.setItem('toDoItems', JSON.stringify(toDoItems.concat(completedItems)));
    }

    function loadToDoItems() {
        const storedItems = localStorage.getItem('toDoItems');
        if (storedItems) {
            const toDoItems = JSON.parse(storedItems);
            toDoItems.forEach(item => addToDoItem(item.text, item.isComplete));
        }
    }
});

