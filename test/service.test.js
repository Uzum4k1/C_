import sinon from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js'; // Use 'import' instead of 'require'
import Repository from '../src/repository.js';

describe('Service Integration Tests', () => {
    let service;
    let repositoryStub;

    beforeEach(() => {
        repositoryStub = sinon.createStubInstance(Repository);
        service = new Service();
        service.repository = repositoryStub;
    });

    it('should return all items', () => {
        const items = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }];
        repositoryStub.getAllItems.returns(items);

        const result = service.getAllItems();

        expect(result).to.equal(items);
        expect(repositoryStub.getAllItems.calledOnce).to.be.true;
    });

    it('should return an item by id', () => {
        const item = { id: 1, name: 'Item1' };
        repositoryStub.getItemById.withArgs(1).returns(item);

        const result = service.getItemById(1);

        expect(result).to.equal(item);
        expect(repositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    });

    it('should throw an error when item is not found', () => {
        repositoryStub.getItemById.returns(null);

        expect(() => service.getItemById(3)).to.throw('Item not found');
        expect(repositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    it('should add a new item', () => {
        const newItem = { id: 3, name: 'Item3' }; // Ensure this object has both id and name
        repositoryStub.items = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }]; // Initialize items
        repositoryStub.addItem.returns(newItem); // Return the new item when addItem is called
    
        const result = service.addItem('Item3'); // Call the service method
    
        // Assert that the repository's addItem method was called with the correct arguments
        expect(repositoryStub.addItem.calledOnceWith(newItem)).to.be.true;
    
        // Assert that the result matches the newItem object
        expect(result).to.equal(newItem);
    });
    

    it('should delete an item by id', () => {
        const itemToDelete = { id: 2, name: 'Item2' };
        repositoryStub.deleteItemById.withArgs(2).returns(itemToDelete);

        const result = service.deleteItemById(2);

        expect(result).to.equal(itemToDelete);
        expect(repositoryStub.deleteItemById.calledOnceWith(2)).to.be.true;
    });

    it('should return null if item to delete is not found', () => {
        repositoryStub.deleteItemById.withArgs(3).returns(null);

        const result = service.deleteItemById(3);

        expect(result).to.be.null;
        expect(repositoryStub.deleteItemById.calledOnceWith(3)).to.be.true;
    });
});
