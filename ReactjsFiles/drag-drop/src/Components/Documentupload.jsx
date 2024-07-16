import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import "./Documentupload.css";
import DragDropFiles from "./DragDropFiles.js";

const Documentupload=()=>{
    const { register, handleSubmit,setError, clearErrors,formState: { errors } } = useForm();
    const [aadharFile, setAadharFile] = useState(null);
    const [panFile, setPanFile] = useState(null);

    const onSubmit = (data) => {
        let valid=true;

        if (!aadharFile) {
            setError("AADHAR_CARD", { type: "manual", message: "Aadhar card is required." });
            valid = false;
        }
        if (!panFile) {
            setError("PAN_CARD", { type: "manual", message: "PAN card is required." });
            valid = false;
        }

      
        if (valid) {
            console.log(data);
            console.log("AADHAR CARD:", aadharFile);
            console.log("PAN CARD:", panFile);
            alert('Document uploaded successfully!');
        }

    };

    const handleAadharFileChange = (event) => {
        const file = event.target.files[0];
        if (file.type === "application/pdf") {
            setAadharFile(file);
            clearErrors("AADHAR_CARD");
        } else {
            alert("Please select a PDF file for Aadhar Card.");
            setError("AADHAR_CARD", { type: "manual", message: "Only PDF files are allowed." });
        }
    };

    const handlePanFileChange = (event) => {
        const file = event.target.files[0];
        if (file.type === "application/pdf") {
            setPanFile(file);
            clearErrors("PAN_CARD");
        } else {
            alert("Please select a PDF file for Pan Card.");
            setError("PAN_CARD", { type: "manual", message: "Only PDF files are allowed." });
        }
    };
  
    const handleFilesDrop = (files) => {
        console.log("Dropped Files:", files);
    };

    const isFieldValid = (field) => {
        return (!errors[field]) && ((aadharFile && field === "AADHAR_CARD") || (panFile && field === "PAN_CARD"));
    };

    return(       
<div className="container">
        <header>Document Upload</header>
        <div class="documentheading">
             <span class="title">
               <span class="text">Please upload your documents for verification.</span>
           </span>
         </div>
<form onSubmit={handleSubmit(onSubmit)}>
    <div className="inputfields">
     <div className={`form-control ${errors.AADHAR_CARD ? 'error' : isFieldValid("AADHAR_CARD") ? 'success' :''}`}>
        <label>1) Aadhar Card</label>
        <div className="input-wrapper">
        {!aadharFile && <span className="drag-drop-text">DRAG and DROP files here<span className="OR"> OR</span></span>}
        <input placeholder="Aadhar Card" className="aadhar" {...register("AADHAR_CARD", { required: "Aadhar card is required." })} type="file" name="AADHAR CARD"onChange={handleAadharFileChange} accept="application/pdf"/>
           </div>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>{errors.AADHAR_CARD && errors.AADHAR_CARD.message}</small>
                  
      </div>
      <div className={`form-control ${errors.PAN_CARD ? 'error' : isFieldValid("PAN_CARD") ? 'success' : ''}`}>
        <label>2) Pan Card</label>
        <div className="input-wrapper">
        {!panFile && <span className="drag-drop-text">DRAG and DROP files here<span className="OR"> OR</span></span>}
        <input placeholder="PAN Card" className="pan" {...register("PAN_CARD", { required: "PAN card is required." })} type="file" name="PAN_CARD" onChange={handlePanFileChange} accept="application/pdf"/>
        </div>
                    <i class="fas fa-check-circle"></i>
                    <i class="fas fa-exclamation-circle"></i>
                    <small>{errors.PAN_CARD && errors.PAN_CARD.message}</small>
      </div>
    </div>
    <div className="submit">
        <button className="submitbtn" type="submit">Submit</button>
    </div>
 <DragDropFiles onFilesDrop={handleFilesDrop} />
</form>   
</div>  
    );
};

export default Documentupload;




























