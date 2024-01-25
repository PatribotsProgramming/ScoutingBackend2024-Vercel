import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import "./Tables.css";

function Contact() {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
                setHeaders(Object.keys(data.numDataMap[0]));
            });
        }, 1000);
    }, []);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        setHeaders(e.target.value);
    }

    return (
        <div className="raw-data">
            <div className="container">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
                ></link>
                <table className="table">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rawDataMap.map((item, index) => (
                            <tr key={index}>
                                {headers.map((header, index) => (
                                    <td key={index}>{item[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <select onChange={() => handleChange}>
                <option value={Object.keys(data.numDataMap[0])}>Num Data</option>
                <option value={Object.keys(data.commentDataMap[0])}>Comment Data</option>
            </select>
        </div>
    );
}

export default Contact;