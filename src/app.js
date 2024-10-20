import express from 'express'; // Gunakan import alih-alih require
const app = express();
app.use(express.json()); // Untuk parsing JSON body

// Dummy data untuk testing
let items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
];

// GET all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// GET item by id
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST create new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description || '',
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE item by id
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        items.splice(itemIndex, 1);
        return res.status(200).json({ message: 'Item deleted successfully' });
    } else {
        return res.status(404).json({ message: 'Item not found' });
    }
});

// PUT (update) item by id
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const item = items.find(item => item.id === id);

    if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        return res.status(200).json({ message: 'Item updated successfully', item });
    } else {
        return res.status(404).json({ message: 'Item not found' });
    }
});

// Export app untuk pengujian
export default app; // Ubah ke export default
