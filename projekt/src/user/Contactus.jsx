import React, { useState, useEffect } from "react";
import USidebar from './UserSidebar';

function Contactus() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Përdorues i panjohur";
    const email = localStorage.getItem("userEmail") || "Email i panjohur";
    const id = localStorage.getItem("userId");

    setUserName(name);
    setUserEmail(email);
    setUserId(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Shkruaj mesazhin tënd para dërgimit!");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:3002/api/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: userName,
          email: userEmail,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Mesazhi u dërgua me sukses!");
        setMessage("");
      } else {
        setStatus(data.error || "❌ Gabim gjatë dërgimit të mesazhit");
      }
    } catch (error) {
      setStatus("❌ Gabim në lidhjen me serverin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#F7F9FC' }}>
      <USidebar />
      <form
        onSubmit={handleSubmit}
        style={{
          flexGrow: 1,
          maxWidth: 600,
          margin: '3rem auto',
          padding: '2.5rem',
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <h2 style={{ marginBottom: '0.5rem', color: '#333' }}>Na Kontakto</h2>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          Në emër të: <b>{userName}</b> ({userEmail})
        </p>

        <textarea
          placeholder="Shkruaj mesazhin këtu..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: '1rem',
            fontSize: '1.1rem',
            borderRadius: 8,
            border: '1.5px solid #ddd',
            resize: 'vertical',
            transition: 'border-color 0.3s',
            outline: 'none',
          }}
          disabled={loading}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 8px rgba(0,123,255,0.4)',
            transition: 'background-color 0.3s ease',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => !loading && (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => !loading && (e.target.style.backgroundColor = '#007bff')}
        >
          {loading ? "Duke dërguar..." : "Dërgo"}
        </button>

        {status && (
          <p
            style={{
              marginTop: '1rem',
              color: status.includes('sukses') ? 'green' : 'red',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default Contactus;
