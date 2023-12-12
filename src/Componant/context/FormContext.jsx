import { createContext } from "react";


const FormContext = createContext({
    
    formData:{},
    updateFormData: () => {},
    pdfData: null,
    updatePdfData: () => {},


})
export default FormContext;

