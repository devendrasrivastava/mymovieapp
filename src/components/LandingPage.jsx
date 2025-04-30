import React from 'react';
import '../css/LandingPage.css';

export default function LandingPage() {
  return (

    <div className='landing-page'>
      <div className="card text-center">

        <div className="card-body">
          <h5 className="card-title">Welcome to our Homepage</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>

        </div>

      </div>


      <div className="card-group landing-page-card">
        <div className="card">
          <img src="./src/assets/card4.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img src="./src/assets/card5.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img src="./src/assets/card6.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}
