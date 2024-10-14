import Repository from './repository.js'; // Use 'import' instead of 'require'

class Service {
    constructor() {
        this.repository = new Repository();
    }

    getAllItems() {
        return this.repository.getAllItems();
    }

    getItemById(id) {
        const item = this.repository.getItemById(id);

        if (!item) {
            throw new Error('Item not found in repository');
        }
        return item;
    }

    addItem(name) {
        const newItem = { id: this.repository.items.length + 1, name };
        return this.repository.addItem(newItem);
    }

    deleteItemById(id) {
        return this.repository.deleteItemById(id);
    }
    
}

export default Service; // Use 'export default' for ES module
