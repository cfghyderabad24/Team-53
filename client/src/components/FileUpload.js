// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { axiosWithToken } from '../axiosWithToken';

// const FileUpload = () => {
//   const [excelData, setExcelData] = useState(null);
//   const [filterColumn, setFilterColumn] = useState('');
//   const [minValue, setMinValue] = useState('');
//   const [maxValue, setMaxValue] = useState('');
//   const [filteredResults, setFilteredResults] = useState([]);

//   const sendEmail = async (recipient, subject, message) => {
//     try {
//       const response = await axiosWithToken.post('http://localhost:4000/admin-api/send-email', {
//         to: recipient,
//         subject: subject,
//         message: message
//       });

//       console.log('Email sent:', response.data.message);
//       window.alert('email sent')
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(jsonData);
//       setFilteredResults(jsonData);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const applyFilter = () => {
//     if (!excelData) return;

//     const filteredData = excelData.filter(item => {
//       const value = parseInt(item[filterColumn]);
//       if (minValue && maxValue) {
//         return value >= parseInt(minValue) && value <= parseInt(maxValue);
//       } else if (minValue) {
//         return value >= parseInt(minValue);
//       } else if (maxValue) {
//         return value <= parseInt(maxValue);
//       }
//       return true;
//     });

//     setFilteredResults(filteredData);
//   };

//   const resetFilter = () => {
//     setFilteredResults(excelData);
//     setFilterColumn('');
//     setMinValue('');
//     setMaxValue('');
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleUpload} />

//       {excelData && (
//         <>
//           <div style={{ marginTop: '20px' }}>
//             <label htmlFor="filterColumn">Filter by Column:</label>
//             <select id="filterColumn" value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
//               <option value="">Select Column</option>
//               {Object.keys(excelData[0]).map((key, index) => (
//                 <option key={index} value={key}>{key}</option>
//               ))}
//             </select>
//           </div>

//           <div style={{ marginTop: '10px' }}>
//             <label htmlFor="minValue">Min Value:</label>
//             <input
//               id="minValue"
//               type="number"
//               value={minValue}
//               onChange={(e) => setMinValue(e.target.value)}
//               placeholder="Enter min value"
//               style={{ marginLeft: '10px' }}
//             />
//           </div>

//           <div style={{ marginTop: '10px' }}>
//             <label htmlFor="maxValue">Max Value:</label>
//             <input
//               id="maxValue"
//               type="number"
//               value={maxValue}
//               onChange={(e) => setMaxValue(e.target.value)}
//               placeholder="Enter max value"
//               style={{ marginLeft: '10px' }}
//             />
//           </div>

//           <button onClick={applyFilter} style={{ marginTop: '10px' }}>Apply Filter</button>
//           <button onClick={resetFilter} style={{ marginTop: '10px', marginLeft: '10px' }}>Reset Filters</button>

//           {filteredResults.length > 0 && (
//             <div style={{ marginTop: '20px' }}>
//               <h3>Filtered Results</h3>
//               <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//                 <thead>
//                   <tr>
//                     {Object.keys(excelData[0]).map((key, index) => (
//                       <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{key}</th>
//                     ))}
//                     <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredResults.map((item, rowIndex) => (
//                     <tr key={rowIndex}>
//                       {Object.keys(item).map((key, colIndex) => (
//                         <td key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>{item[key]}</td>
//                       ))}
//                       <td style={{ border: '1px solid black', padding: '8px' }}>
//                         <button
//                           type="button"
//                           onClick={() => sendEmail(item.to, item.subject, item.message)}
//                         >
//                           Send Email
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { axiosWithToken } from '../axiosWithToken';

const FileUpload = () => {
  const [excelData, setExcelData] = useState(null);
  const [filterColumn, setFilterColumn] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const sendEmail = async (recipient, subject, message) => {
    try {
      const response = await axiosWithToken.post('http://localhost:4000/admin-api/send-email', {
        to: recipient,
        subject: subject,
        message: message
      });
      console.log('Email sent:', response.data.message);
      window.alert('Email sent');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      setFilteredResults(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const applyFilter = () => {
    if (!excelData) return;

    const filteredData = excelData.filter(item => {
      const value = parseInt(item[filterColumn]);
      if (minValue && maxValue) {
        return value >= parseInt(minValue) && value <= parseInt(maxValue);
      } else if (minValue) {
        return value >= parseInt(minValue);
      } else if (maxValue) {
        return value <= parseInt(maxValue);
      }
      return true;
    });

    setFilteredResults(filteredData);
  };

  const resetFilter = () => {
    setFilteredResults(excelData);
    setFilterColumn('');
    setMinValue('');
    setMaxValue('');
    setSearchTerm('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchResult = excelData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredResults(searchResult);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />

      {excelData && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="filterColumn">Filter by Column:</label>
            <select id="filterColumn" value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
              <option value="">Select Column</option>
              {Object.keys(excelData[0]).map((key, index) => (
                <option key={index} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="minValue">Min Value:</label>
            <input
              id="minValue"
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              placeholder="Enter min value"
              style={{ marginLeft: '10px' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="maxValue">Max Value:</label>
            <input
              id="maxValue"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              placeholder="Enter max value"
              style={{ marginLeft: '10px' }}
            />
          </div>

          <button onClick={applyFilter} style={{ marginTop: '10px' }}>Apply Filter</button>
          <button onClick={resetFilter} style={{ marginTop: '10px', marginLeft: '10px' }}>Reset Filters</button>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="searchTerm">Search:</label>
            <input
              id="searchTerm"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter search term"
              style={{ marginLeft: '10px' }}
            />
          </div>

          {filteredResults.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Filtered Results</h3>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key, index) => (
                      <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{key}</th>
                    ))}
                    <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(item).map((key, colIndex) => (
                        <td key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>{item[key]}</td>
                      ))}
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <button
                          type="button"
                          onClick={() => sendEmail(item.to, item.subject, item.message)}
                        >
                          Send Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileUpload;
