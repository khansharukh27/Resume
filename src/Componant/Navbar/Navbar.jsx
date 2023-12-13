import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav class="d-sm-flex justify-content-between">


      <div class=""><b>Navbar</b></div>
      <div className='d-sm-flex justify-content-between' >
        <div><Link to="/" className=" text-decoration-none">
          Resume Template
        </Link></div>
        <div><Link to="/myresume" className="  text-decoration-none">
          My Resume
        </Link></div>
        <div><Link to="/about" className=" text-decoration-none">
          About Us
        </Link>
        </div>






      </div>


    </nav>);
}

export default Navbar;
