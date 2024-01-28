import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import "./Tables.css";

function RawData() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [selectedDataMap, setSelectedDataMap] = useState('rawDataMap'); // New state variable for selected data map

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
                setHeaders(Object.keys(data[selectedDataMap][0]));
            });
        }, 1000);
    }, [selectedDataMap]); // Add selectedDataMap to the dependency array

    if (data.length === 0) {
        return <div>Loading...</div>;
    }
    console.log(data.rawDataMap);
    const handleChange = (e) => {
        const selectedOption = e.target.value;
        setHeaders(selectedOption.split(','));
        setSelectedDataMap(selectedOption === 'Num Data' ? 'rawDataMap' : 'commentDataMap'); // Update selectedDataMap based on selected option
    }

    return (
        <div className="raw-data">
            <div className="container">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
                ></link>
                <table className="table">
                    <thead className="header">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data[selectedDataMap].map((item, index) => ( // Use selectedDataMap here
                            <tr key={index}>
                                {headers.map((header, index) => (
                                    <td key={index}>{item[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <select onChange={handleChange}>
                <option value={Object.keys(data.rawDataMap[0])}>Num Data</option>
                <option value={Object.keys(data.commentDataMap[0])}>Comment Data</option>
            </select>
        </div>
    );
}

export default RawData;