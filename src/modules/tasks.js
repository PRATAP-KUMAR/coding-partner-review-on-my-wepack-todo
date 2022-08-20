import AddItem from './addItem.js';
import updateCheckBox from './updateCheckbox.js';

class Tasks {
  constructor() {
    this.tasks = [];
  }

  getStorage() {
    if (localStorage.getItem('ITEMS') === null) {
      this.tasks = [];
    } else {
      this.tasks = Array.from(JSON.parse(localStorage.getItem('ITEMS')));
    }
  }

  addItem() {
    this.getStorage();
    const input = document.getElementById('itemInput');
    const length = this.tasks.length ? this.tasks.length + 1 : 1;
    const toAdd = { index: length, completed: false, desc: input.value };
    const contentBox = document.body.querySelector('.content');
    contentBox.appendChild(AddItem(toAdd));
    input.value = '';
    localStorage.setItem('ITEMS', JSON.stringify([...JSON.parse(localStorage.getItem('ITEMS') || '[]'), toAdd]));
  }

  removeItem(btn) {
    this.getStorage();
    btn.parentElement.remove();
    localStorage.clear();

    const available = document.querySelectorAll('#checkbox');
    if (available.length > 0) {
      const newArray = [];
      let length = 1;

      [...available].forEach((child) => {
        const toAdd = {
          index: length,
          completed: child.checked,
          desc: child.nextElementSibling.innerText,
        };
        newArray.push(toAdd);
        length += 1;
        updateCheckBox(child);
      });
      localStorage.setItem('ITEMS', JSON.stringify(newArray));
    }
    window.location.reload();
  }

  updateItem(checkbox) {
    this.getStorage();
    updateCheckBox(checkbox);
    const available = document.querySelectorAll('#checkbox');
    if (available.length > 0) {
      const newArray = [];
      let length = 1;
      [...available].forEach((child) => {
        const toAdd = {
          index: length,
          completed: child.checked,
          desc: child.nextElementSibling.innerText,
        };
        newArray.push(toAdd);
        length += 1;
      });
      localStorage.setItem('ITEMS', JSON.stringify(newArray));
    }
  }

  clearAll() {
    this.getStorage();
    const toremove = document.querySelectorAll('input:checked');
    [...toremove].forEach((checkbox) => {
      checkbox.parentElement.remove();
    });
    localStorage.clear();
    const available = document.querySelectorAll('.desc');
    if (available.length > 0) {
      const newArray = [];

      let length = 1;

      [...available].forEach((child) => {
        const toAdd = { index: length, completed: false, desc: child.innerText };
        newArray.push(toAdd);
        length += 1;
      });
      localStorage.setItem('ITEMS', JSON.stringify(newArray));
    }
  }
}

export default Tasks;
