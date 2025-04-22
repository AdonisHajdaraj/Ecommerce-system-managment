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
        <div className="d-flex" style={{ backgroundColor: '#C0C0C0' }}>
            <USidebar />
            <div className="container-fluid p-4" style={{ marginLeft: '150px', flex: 1 }}>
                <h2 className="mb-4 fw-bold" style={{ fontWeight: 'bold', fontSize: '3rem' }}>Dashboard</h2>


                 {/* ✅ FOTO skej me skej me lartësi të kufizuar */}
                 <div
                    className="mb-4"
                    style={{
                        position: 'relative',
                        left: '-150px',
                        
                        width: 'calc(100% + 80px)'
                    }}
                >
                    <img
                        src="https://i1.wp.com/billionaire365.com/wp-content/uploads/2019/02/Ecommerce-Website.jpg?fit=2048%2C1452&ssl=1"
                        alt="Dashboard Image"
                        className="img-fluid shadow"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '350px', // mund ta ndryshosh nqs don më të vogël ose më të madhe
                            objectFit: 'cover',
                            borderRadius: '0',
                        }}
                    />
                </div>
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card shadow-sm p-4 border-0">
                            <h5 className="fw-bold" style={{fontSize:'2.7rem'}}>Mirësevini, {userName}:)</h5>
                            <p className="text-muted" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Ky është paneli juaj i kontrollit. Menaxhoni të dhënat tuaja dhe shikoni statistikat.</p>
                        </div>
                    </div>
                    
                  
                </div>
                
                <div className="row mt-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold" style={{fontSize:'2rem'}}>Porositë</h6>
                            <p className="text-muted" style={{ fontWeight: 'bold', fontSize: '2rem' }}>10k+ aktive</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold" style={{ fontSize: '2rem' }}>Produktet</h6>
                            <p className="text-muted" style={{ fontWeight: 'bold', fontSize: '2rem' }}>500k+ në dispozicion</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Transporti</h6>
        
                            <p className="text-muted" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Postë e shpejtë: DHL</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4 border-0">
                            <h6 className="fw-bold"style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Feedback i Klientëve</h6>
                            <p className="text-muted"style={{ fontWeight: 'bold', fontSize: '2rem' }}>Vlerësimi Mesatar :4.5/5</p>
                        </div>
                    </div>
                </div>

                
                
</div>
                </div>
            </div>
        
    );
};

export default UDashboard;