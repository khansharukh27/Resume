// import logo from './logo.svg'

import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import Home from './Componant/Navbar/Home'
import Navbar from './Componant/Navbar/Navbar';
import About from './Componant/Navbar/About';
import MyResume from './Componant/Navbar/MyResume';
import DataFilling from './Componant/body/DataFilling'
// import WorkExperience from './Componant/body/WorkExperien';
import ReviewPage from './Componant/Review/ReviewPage';
import FormProvider from './Componant/context/FormProvider';
import KeySkills from './Componant/body/KeySkills';
import EducationDetails from './Componant/body/EducationDetails';
import WorkExperience from './Componant/body/WorkExperience';
import ReviewPage1 from './Componant/Review/ReviewPage1';
import Certification from './Componant/body/Certification';
// import { useContext } from 'react';
// import FormContext from './Componant/context/FormContext';


function App() {

  return (
    <Router>
      <FormProvider>
    
      <Navbar/>
      
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/myresume' element={<MyResume />}/>
        <Route path="/datafilling/:id/personaldetails" element={<DataFilling/>}/>
        <Route path='/datafilling/:id/workExperience' element={<WorkExperience/>}/>
        <Route path='/datafilling/:id/education' element= {<EducationDetails/>}/>
        <Route path='/datafilling/:id/keyskills' element ={<KeySkills />}/>
        <Route path='/review/1' element = {<ReviewPage  />}/>
        <Route path='/review/2'  element = {<ReviewPage1  />}/>
        <Route path='datafilling/:id/certification' element={<Certification/>}/>
      </Routes> 
      </FormProvider>

    
    </Router>
  );
}

export default App;
