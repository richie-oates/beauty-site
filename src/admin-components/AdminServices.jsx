import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        name: "",
        price: "",
        type: "makeup",
    });
    const [editingId, setEditingId] = useState(null);
    const [editedService, setEditedService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .order("type", { ascending: true });
        if (error) {
            console.error(error);
            return;
        }
        setServices(data);
    }

    async function addService() {
        if (!newService.name || !newService.price) return alert("Please fill in all fields!");

        const { error } = await supabase.from("services").insert([newService]);
        if (error) {
            console.error(error);
            return;
        }
        setNewService({ name: "", price: "", type: "makeup" });
        fetchServices();
    }

    async function deleteService(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this service?");
        if (!confirmDelete) return;

        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) {
            console.error(error);
            return;
        }
        fetchServices();
    }

    async function saveEdit() {
        const { error } = await supabase
            .from("services")
            .update({
                name: editedService.name,
                price: editedService.price,
                type: editedService.type,
            })
            .eq("id", editedService.id);

        if (error) {
            console.error(error);
            return;
        }
        setEditingId(null);
        setEditedService(null);
        fetchServices();
    }

    const groupedServices = services.reduce((acc, service) => {
        acc[service.type] = acc[service.type] || [];
        acc[service.type].push(service);
        return acc;
    }, {});

    return (
        <div className="admin-services">
            <h2>Manage Services</h2>

            {/* Add New Service */}
            <div className="add-service-form">
                <input
                    type="text"
                    placeholder="Service name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
                <select
                    value={newService.type}
                    onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                >
                    <option value="makeup">Makeup</option>
                    <option value="lashes">Lashes</option>
                </select>
                <button onClick={addService}>Add</button>
            </div>

            {/* Grouped Services */}
            {["makeup", "lashes"].map((type) => (
                <div key={type} className="service-group">
                    <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    {groupedServices[type]?.map((service) => (
                        <div key={service.id} className="service-item">
                            {editingId === service.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedService.name}
                                        onChange={(e) =>
                                            setEditedService({ ...editedService, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        value={editedService.price}
                                        onChange={(e) =>
                                            setEditedService({ ...editedService, price: e.target.value })
                                        }
                                    />
                                    <select
                                        value={editedService.type}
                                        onChange={(e) =>
                                            setEditedService({ ...editedService, type: e.target.value })
                                        }
                                    >
                                        <option value="makeup">Makeup</option>
                                        <option value="lashes">Lashes</option>
                                    </select>
                                    <button onClick={saveEdit}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>{service.name}</span>
                                    <span>£{service.price}</span>
                                    <button
                                        onClick={() => {
                                            setEditingId(service.id);
                                            setEditedService(service);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => deleteService(service.id)} className="delete-btn">🗑️</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
