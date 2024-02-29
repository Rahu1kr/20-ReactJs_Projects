import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="container">
      <nav>
        <img src="images/logo.png" alt="imaged" className="logo" />
        <ul>
          <li>
            <a href="#">Traval Guide</a>
          </li>
          <li>
            <a href="#">famous Places</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
        <button className="btn">
          <img src="images/icon.png" alt="icon" className='icon'/>Bookings
        </button>
      </nav>
      <div className="content">
        <h1>
          Beautiful
          <br />
          Places to explore
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus aliquam libero quasi commodi dolorem veniam consequatur vitae magnam hic ab odio consequuntur corrupti dolorum est soluta ad itaque, architecto harum dicta fugit cupiditate. Repellat iste libero exercitationem, dolore molestiae explicabo quaerat, tempore reiciendis possimus placeat obcaecati tenetur cum temporibus tempora! Ut, unde. Deserunt quos delectus aperiam modi soluta quae, vero quidem porro impedit ex ducimus maiores natus? Eius possimus, error aspernatur cumque quaerat voluptatum illo laboriosam officia aliquam vitae, nam hic eveniet ab explicabo unde totam incidunt quas nisi similique earum quo numquam! Quia minus nemo quasi repellendus at doloribus.
        </p>
        <form>
          <input type="text" placeholder='Country Name' />
          <button type='submit' className='btn'>
            Search
          </button>
        </form>
      </div>
      <p></p>
    </div>
  );
}

export default App;
