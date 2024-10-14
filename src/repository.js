class Repository {
    constructor() {
        this.items = [
            { id: 1, name: 'Item1' },
            { id: 2, name: 'Item2' }
        ];
    }

    getAllItems() {
        return this.items;
    }

    getItemById(id) {
        return this.items.find(item => item.id === id) || null;
    }

    addItem(item) {
        this.items.push(item);
        return item;
    }

    deleteItemById(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = this.items.splice(index, 1);
            return deletedItem[0];
        }
        return null;
    }
}

export default Repository; // Use 'export default' for ES module
