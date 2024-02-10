import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import "./Tables.css";

function RawData() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [selectedDataMap, setSelectedDataMap] = useState('rawDataMap'); // New state variable for selected data map
    const [sortOrder, setSortOrder] = useState(1);
    const [sortCol, setSortCol] = useState("Match Number");

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
                setHeaders(Object.keys(data[selectedDataMap][0]));
            });
        }, 100);
    }, [selectedDataMap]); // Add selectedDataMap to the dependency array

    useEffect(() => {
        console.log(data[selectedDataMap]);
        if (data[selectedDataMap] !== undefined) {
            sortByKey(data[selectedDataMap], sortCol);
        }
    }, [sortOrder, sortCol]);

    function sortByKey(arr, key) {
        return arr.sort((a, b) => {
            if (Number(a[key]) > Number(b[key])) return -1 * sortOrder;
            else if (Number(a[key]) < Number(b[key])) return 1 * sortOrder;
            else return 0;
        });
    }

    const handleSort = (header) => { // New function to handle sorting
        setSortCol(header);
        setSortOrder(sortOrder * -1); // Toggle the sort order
    };

    if (data.length === 0) {
        return <div>Loading...</div>;
    }
    const handleChange = (e) => {
        const selectedOption = e.target.value;
        console.log(selectedOption);
        setSelectedDataMap(selectedOption === 'Num Data' ? 'rawDataMap' : 'commentDataMap'); // Update selectedDataMap based on selected option
        console.log(selectedDataMap);
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
                        <tr onClick={handleSort}>
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
                <option value={'Num Data'}>Num Data</option>
                <option value={'Comment Data'}>Comment Data</option>
            </select>
        </div>
    );
}

export default RawData;