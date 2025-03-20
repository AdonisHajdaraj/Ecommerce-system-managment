import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const UDashboard = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');

        if (name && email && id && role) {
            setUserName(name);
            setUserEmail(email);
            setUserId(id);
            setUserRole(role);
        } else {
            console.log('Të dhënat janë të pasakshme ose nuk ekzistojnë');
            setUserName('Përdorues i panjohur');
            setUserEmail('Email i panjohur');
            setUserId('ID i panjohur');
            setUserRole('Roli i panjohur');
        }
    }, []);

    return (
        <div className="d-flex" style={{ backgroundColor: '#f8f9fa' }}>
            <USidebar />
            <div className="container-fluid p-4" style={{ marginLeft: '250px', flex: 1 }}>
                <h2 className="mb-4 fw-bold">Dashboard</h2>
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card shadow-sm p-4 border-0">
                            <h5 className="fw-bold">Mirësevini, {userName}!</h5>
                            <p className="text-muted">Ky është paneli juaj i kontrollit. Menaxhoni të dhënat tuaja dhe shikoni statistikat.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow-sm p-4 border-0 bg-primary text-white">
                            <h6 className="fw-bold">Informacioni i përdoruesit</h6>
                            <p>Email: {userEmail}</p>
                            <p>ID: {userId}</p>
                            <p>Roli: {userRole}</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Porositë</h6>
                            <p className="text-muted">10+ aktive</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Produktet</h6>
                            <p className="text-muted">50+ në dispozicion</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Të ardhurat</h6>
                            <p className="text-muted">$5,000 këtë muaj</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Vizitorët</h6>
                            <p className="text-muted">1,200 sot</p>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Statistikat e Shitjeve</h6>
                            <p className="text-muted">Shitje të realizuara këtë muaj: 120</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold">Feedback i Klientëve</h6>
                            <p className="text-muted">Vlerësimi mesatar: 4.5/5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UDashboard;