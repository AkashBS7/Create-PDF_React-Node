import axios from 'axios';
import { saveAs } from 'file-saver';
import React,{ useState } from 'react';
import './App.css';

function App() {

  const name = useFormInput('');
  const receiptId = useFormInput('');
  const price1 = useFormInput('');
  const price2 = useFormInput('');

  console.log(name);
  console.log(receiptId);
  console.log(price1);
  console.log(price2);

  const data = {
    name : name.value,
    receiptId : receiptId.value,
    price1 : price1.value,
    price2 : price2.value
  }

  console.log('dara', data);

  const createAndDownloadPdf = () => {
    axios.post('http://localhost:4000/generate_pdf', data)
    .then((response)=> axios.get('http://localhost:4000/fetch_pdf',{responseType: 'blob'}))
    .then((res)=>{
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'newPdf.pdf');
    })
  }

  return (
    <div className="App">
     <input type="text" placeholder="Name" name="name" {...name}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" {...receiptId} />
        <input type="number" placeholder="Price 1" name="price1" {...price1} />
        <input type="number" placeholder="Price 2" name="price2" {...price2} />
        <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default App;
