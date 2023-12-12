import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav class="d-flex justify-content-between">


      <div class="">
        <b>Navbar</b>
        </div>
        <div className='d-flex' >
       <Link to="/" className="nav-link mx-2 text-decoration-none">
          Resume Template
        </Link>
        <Link to="/myresume" className="nav-link mx-2 text-decoration-none">
          My Resume
        </Link>
        <Link to="/about" className="nav-link mx-2 text-decoration-none">
          About Us
        </Link>



        </div>
              

    </nav>);
}

export default Navbar;
