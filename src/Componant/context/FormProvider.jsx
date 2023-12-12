import { useState } from "react";
import FormContext from "./FormContext";

const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [pdfData, setPdfData] = useState(null);
    const [resumeSaved, setResumeSaved] = useState(false); // New state


    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const updatePdfData = (data) => {
        setPdfData(data);
        setResumeSaved(true)
    }

    return (
        <FormContext.Provider value={{ formData, updateFormData, pdfData, updatePdfData, resumeSaved }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormProvider;
