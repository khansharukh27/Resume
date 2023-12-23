import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav class=" d-flex justify-content-between" style={{width:'100%'}}>


      <div class=""><b>Navbar</b></div>
      <div className='d-sm-flex justify-content-between' >
        <div style={{border:'1px solid grey',borderRadius:'5px'}}><Link to="/" className=" text-decoration-none">Resume Template</Link></div>
        <div style={{border:'1px solid grey',borderRadius:'5px',margin:'2px',padding:'2px'}}><Link to="/myresume" className="  text-decoration-none">My Resume</Link></div>
        <div style={{border:'1px solid grey',borderRadius:'5px',margin:'2px',padding:'2px'}}><Link to="/about" className=" text-decoration-none">About Us</Link></div>






      </div>


    </nav>);
}

export default Navbar;
