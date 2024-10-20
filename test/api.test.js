import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js'; // Menggunakan import setelah konversi app.js ke ES Modules

describe('API Testing', () => {

    // Uji GET /api/items
    it('should return all items', async () => {
        const res = await request(app).get('/api/items');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
    });

    // Uji POST /api/items
    it('should create a new item', async () => {
        const newItem = { name: 'Item 3' };
        const res = await request(app).post('/api/items').send(newItem);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
    });

    // Latihan 1: Uji DELETE /api/items/:id
    it('should delete an item by id', async () => {
        const idToDelete = 1; // Ganti dengan ID yang valid
        const res = await request(app).delete(`/api/items/${idToDelete}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');
    });

    it('should return 404 when trying to delete a non-existent item', async () => {
        const invalidId = 999; // ID yang tidak ada
        const res = await request(app).delete(`/api/items/${invalidId}`);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
    });

    // Latihan 2: Uji PUT /api/items/:id
    it('should update an item by id', async () => {
        const idToUpdate = 2; // Ganti dengan ID yang valid
        const updatedData = { name: 'Updated Item 2', description: 'Updated Description' };
        const res = await request(app).put(`/api/items/${idToUpdate}`).send(updatedData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item updated successfully');
        expect(res.body).to.have.property('item');
        expect(res.body.item).to.include(updatedData);
    });

    it('should return 404 when trying to update a non-existent item', async () => {
        const invalidId = 999; // ID yang tidak ada
        const updatedData = { name: 'Nonexistent Item', description: 'This item does not exist' };
        const res = await request(app).put(`/api/items/${invalidId}`).send(updatedData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
    });
});
