import React, { useState } from 'react';
import './CRUDList.css';

function CRUDList() {
    const [entities, setEntities] = useState([
        { id: 789456, name: 'Telreyne Cosmar', gradYear: 2024, shoeSize: 13 },
        { id: 456123, name: 'Bando Calrissian', gradYear: 2024, shoeSize: 14 },
        { id: 456753, name: 'Phlower Power', gradYear: 2024, shoeSize: 8 },
        { id: 159357, name: 'Bradley Sawall', gradYear: 2026, shoeSize: 11 },
    ]);

    const [filteredEntities, setFilteredEntities] = useState(entities);
    const [searchTerm, setSearchTerm] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [newEntity, setNewEntity] = useState({ id: '', name: '', gradYear: '', shoeSize: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntity({ ...newEntity, [name]: value });
    };

    const handleAddEntity = () => {
        if (!newEntity.id || !newEntity.name || !newEntity.gradYear || !newEntity.shoeSize) {
            setError('All fields are required.');
            return;
        }

        const updatedEntities = [...entities, newEntity];
        setEntities(updatedEntities);
        setFilteredEntities(updatedEntities); // Update filtered list
        setNewEntity({ id: '', name: '', gradYear: '', shoeSize: '' });
        setShowForm(false);
        setError('');
    };

    const handleDeleteEntity = (id) => {
        const updatedEntities = entities.filter((entity) => entity.id !== id);
        setEntities(updatedEntities);
        setFilteredEntities(updatedEntities); // Update filtered list
    };

    const handleEditEntity = (id) => {
        const entityToEdit = entities.find((entity) => entity.id === id);
        setNewEntity(entityToEdit);
        setShowForm(true);
        setEntities(entities.filter((entity) => entity.id !== id));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const searchResults = entities.filter((entity) =>
            entity.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            entity.id.toString().includes(e.target.value) ||
            entity.gradYear.toString().includes(e.target.value) ||
            entity.shoeSize.toString().includes(e.target.value)
        );
        setFilteredEntities(searchResults);
    };

    return (
        <div className="crud-list">
            <h2>Entities List</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ID, Name, Grad Year, Shoe Size"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Student'}
            </button>

            {showForm && (
                <div className="form-inline">
                    <div className="form-group mb-3">
                        <label>ID</label>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            value={newEntity.id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={newEntity.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Grad Year</label>
                        <input
                            type="text"
                            className="form-control"
                            name="gradYear"
                            value={newEntity.gradYear}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Shoe Size</label>
                        <input
                            type="text"
                            className="form-control"
                            name="shoeSize"
                            value={newEntity.shoeSize}
                            onChange={handleInputChange}
                        />
                    </div>
                    {error && <p className="error text-danger">{error}</p>}
                    <button className="btn btn-success" onClick={handleAddEntity}>
                        Save
                    </button>
                </div>
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Grad Year</th>
                        <th>Shoe Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntities.map((entity, index) => (
                        <tr key={index}>
                            <td>{entity.id}</td>
                            <td>{entity.name}</td>
                            <td>{entity.gradYear}</td>
                            <td>{entity.shoeSize}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEditEntity(entity.id)}
                                >
                                    <i className="fas fa-edit"></i> Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteEntity(entity.id)}
                                >
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CRUDList;
