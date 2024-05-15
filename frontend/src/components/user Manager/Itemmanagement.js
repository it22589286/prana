import React from 'react';
import { Link } from 'react-router-dom';
import yogaImage from '../image/yogapose.jpg'; 

export default function ItemManagement() {
  return (
    <div className='flex' style={{ backgroundImage: `url(${yogaImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className="container-fluid h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-4">Manage Items</h1>
              <Link to='/Additem' className="btn btn-primary btn-block mb-3">
                <i className="fas fa-plus-circle mr-2"></i>Add New Item
              </Link>
              <Link to='/Itemlist' className="btn btn-primary btn-block mb-3">
                <i className="fas fa-list mr-2"></i>View Item List
              </Link>
              <Link to='/Request' className="btn btn-primary btn-block">
                <i className="fas fa-envelope mr-2"></i>Send Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
