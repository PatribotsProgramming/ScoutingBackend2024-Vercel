import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import "./Tables.css";

function Rankings() {
    const [data, setData] = useState([]);
    const [sortCol, setSortCol] = useState("Score");
    const [sortOrder, setSortOrder] = useState(1); // New state variable for sort order


    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
                sortByKey(data.rankingTable, sortCol);
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (data.rankingTable !== undefined && data.rankingTable !== null) {
            sortByKey(data.rankingTable, sortCol);
        }
    }, [sortOrder, sortCol]);

    // TODO: make working
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

    let headers = Object.keys(data.rankingTable[0]);

    return (
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
                                <button
                                    id={index}
                                    className="filter"
                                    onClick={() => handleSort(header)} // Use handleSort function here
                                >
                                    <i
                                        class="fa fa-filter"
                                        style={{ fontSize: "12px" }}
                                    ></i>
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.rankingTable.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, index) => (
                                <td key={index}>
                                    {(isNaN(item[header])) ? item[header] : Math.round(item[header] * 100) / 100}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Rankings;