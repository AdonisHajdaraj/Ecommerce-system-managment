import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaUserTag
} from 'react-icons/fa';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');

    setUserName(name || 'Përdorues i panjohur');
    setUserEmail(email || 'Email i panjohur');
    setUserId(id || 'ID i panjohur');
    setUserRole(role || 'Roli i panjohur');
  }, []);

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <div className="container-fluid p-4" style={{ marginLeft: '250px', flex: 1 }}>
        <h2 className="mb-4 fw-bold text-primary" style={{ fontSize: '3rem' }}>BoHoChic</h2>

        {/* Përshëndetja */}
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
                Mirësevini, {userName} 👋
              </h4>
              <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                Ky është paneli juaj si pjesë e ekipit. Këtu mund të shikoni të dhënat tuaja dhe informacionin e platformës.
              </p>
            </div>
          </div>
        </div>

        {/* Të dhënat e përdoruesit */}
        <div className="row mt-4 g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex align-items-center">
                <FaUser size={30} className="text-primary me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Emri</h6>
                  <p className="mb-0">{userName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex align-items-center">
                <FaEnvelope size={30} className="text-success me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="mb-0">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex align-items-center">
                <FaIdBadge size={30} className="text-warning me-3" />
                <div>
                  <h6 className="fw-bold mb-1">ID</h6>
                  <p className="mb-0">{userId}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex align-items-center">
                <FaUserTag size={30} className="text-danger me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Roli</h6>
                  <p className="mb-0">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rreth BoHoChic */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm p-4 border-0 bg-white">
              <h5 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>Rreth Nesh</h5>
              <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                <strong>BoHoChic</strong> është një platformë moderne për shitje online e ndërtuar për të ofruar një eksperiencë të thjeshtë, të shpejtë dhe të këndshme për klientët dhe stafin.
              </p>
              <ul className="text-muted" style={{ fontSize: '1.1rem' }}>
                <li>✔ Produkte me dizajn boho-chic të kuruara me kujdes</li>
                <li>✔ Porosi të përpunuara shpejt dhe me korrektësi</li>
                <li>✔ Sisteme të sigurta të pagesës dhe menaxhimit të të dhënave</li>
                <li>✔ Përdorim i teknologjive të fundit për përvojë optimale</li>
                <li>✔ E ndërtuar për të qenë lehtësisht e menaxhueshme nga stafi</li>
              </ul>
              <p className="text-muted mt-2" style={{ fontSize: '1.2rem' }}>
                Ekipi ynë përpiqet të përmirësojë platformën çdo ditë për t’ju sjellë më të mirën në shitje dhe menaxhim.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
