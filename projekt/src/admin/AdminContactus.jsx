import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminContactus() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:3002/api/contactus");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së mesazheve:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("A jeni i sigurt që doni ta fshini këtë mesazh?")) return;

    try {
      const res = await fetch(`http://localhost:3002/api/contactus/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        alert("Gabim gjatë fshirjes.");
      }
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Mesazhet e Kontaktit</h4>
          </div>
          <div className="card-body table-responsive">
            {messages.length === 0 ? (
              <p className="text-center">Nuk ka mesazhe për të shfaqur.</p>
            ) : (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Emri</th>
                    <th>Email</th>
                    <th>Mesazhi</th>
                    <th>Data</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.message}</td>
                      <td>{new Date(msg.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(msg._id)}
                        >
                          Fshi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContactus;
