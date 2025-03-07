import React, { useState } from 'react';

interface NewItem {
  name: string;
  price: string;
}

interface AddItemFormProps {
  onAddItem: (item: NewItem) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState<NewItem>({ name: "", price: "" });
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.price) {
      alert("Please fill out all required fields");
      return;
    }
    
    const price = parseFloat(newItem.price);
    if (isNaN(price)) {
      alert("Price must be a valid number");
      return;
    }
    
    onAddItem(newItem);
    setNewItem({ name: "", price: "" });
    setShowForm(false);
  };
  
  return (
    <div className="mb-8">
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Item
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Add New Item to Your Wishlist</h3>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Item Name*</label>
              <input 
                type="text" 
                value={newItem.name} 
                onChange={e => setNewItem({...newItem, name: e.target.value})} 
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Price*</label>
              <input 
                type="text" 
                value={newItem.price} 
                onChange={e => setNewItem({...newItem, price: e.target.value})} 
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add to Wishlist
          </button>
        </form>
      )}
    </div>
  );
};