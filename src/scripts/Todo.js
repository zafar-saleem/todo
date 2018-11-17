let mockData = [{
  id: '1',
  title: 'This is title',
  done: false,
  date: new Date()
}, {
  id: '2',
  title: 'This is second title',
  done: false,
  date: new Date()
}, {
  id: '3',
  title: 'This is third title',
  done: false,
  date: new Date()
}, {
  id: '4',
  title: 'This is forth title',
  done: false,
  date: new Date()
}];

class Todo {

  constructor() {
    let self = this;

    this.list = document.querySelector('.list-items');
    this.render();

    document.querySelector('.btn-add-item').addEventListener('click', this.insertItem.bind(this));
    document.querySelector('.btn-update').addEventListener('click', this.updateItem.bind(this));

    document.addEventListener('click', event => {
      if (!event.target) {
        return;
      }

      if (event.target.classList.contains('btn-delete')) {
        self.removeItem(event);
      }

      if (event.target.classList.contains('btn-edit')) {
        self.renderEditForm(event);
      }

      if (event.target.classList.contains('btn-complete')) {
        self.setTaskComplete(event);
      }
    });
  }

  render() {
    this.list.innerHTML = '';

    mockData.forEach(item => {
      this.createDomElements(item.id);
      this.li.insertAdjacentHTML('afterbegin', item.title);

      if (item.done) {
        this.li.classList.add('done');
      }

      this.list.appendChild(this.li);
    });
  }

  renderEditForm(event) {
    let id = event.target.getAttribute('data-id');

    document.querySelector('.edit-popup').classList.remove('hide');
    document.querySelector('.edit-popup').classList.add('show');
    document.querySelector('.btn-update').setAttribute('data-id', id);

    mockData.forEach(item => {
      if (item.id === id) {
        document.querySelector('.edit-item').value = item.title;
      }
    });
  }

  createDomElements(id) {
    this.li = document.createElement('li');
    this.edit = document.createElement('button');
    this.delete = document.createElement('button');
    this.complete = document.createElement('button');

    this.edit.classList.add('btn-edit');
    this.delete.classList.add('btn-delete');
    this.complete.classList.add('btn-complete');

    this.delete.setAttribute('data-id', id);
    this.edit.setAttribute('data-id', id);
    this.complete.setAttribute('data-id', id);

    this.edit.innerHTML = 'Edit';
    this.delete.innerHTML = 'Delete';
    this.complete.innerHTML = 'Complete';

    this.li.appendChild(this.delete);
    this.li.appendChild(this.edit);
    this.li.appendChild(this.complete);
  }

  insertItem() {
    let todoItem = document.querySelector('.item').value;

    let newItem = {
      id: Date.now().toString(),
      title: todoItem,
      done: false,
      date: new Date()
    };

    mockData.push(newItem);

    document.querySelector('.item').value = '';
    this.render();
  }

  removeItem(event) {
    let id = event.target.getAttribute('data-id');

    mockData = mockData.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    this.render();
  }

  updateItem(event) {
    let id = event.target.getAttribute('data-id');
    let itemTobeUpdated = document.querySelector('.edit-item').value;

    mockData = mockData.map(item => {
      if (item.id === id) {
        item['title'] = itemTobeUpdated;
      }

      return item;
    });

    document.querySelector('.edit-popup').classList.remove('show');
    document.querySelector('.edit-popup').classList.add('hide');

    this.render();
  }

  setTaskComplete(event) {
    let id = event.target.getAttribute('data-id');

    mockData = mockData.map(item => {
      if (item.id === id) {
        item['done'] = true;
      }

      return item;
    });

    this.render();
  }
}

export default Todo;
