import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";
import "./Rankings.css";

function Rankings() {
    const [data, setData] = useState([]);
    const [sortCol, setSortCol] = useState("age");
    const [sortOrder, setSortOrder] = useState(1); // New state variable for sort order

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with your actual data structure
            const result = [
                { name: "4738", ranking: 50, ampRanking: 20, amt: 2400, A: 120, B: 110 },
                { name: "4739", ranking: 60, ampRanking: 30, amt: 2500, A: 130, B: 120 },
                { name: "4740", ranking: 70, ampRanking: 40, amt: 2600, A: 140, B: 130 },
                { name: "4741", ranking: 80, ampRanking: 50, amt: 2700, A: 150, B: 140 },
                { name: "4742", ranking: 90, ampRanking: 60, amt: "HI", A: 160, B: 150 },
            ];
            result.sort(compareByAge(sortCol));
            setData(result);
        };

        fetchData();
    }, [sortCol, sortOrder]); // Add sortOrder to the dependency array

    function compareByAge(sortCol) {
        return function (a, b) {
            if (a[sortCol] > b[sortCol]) return -1 * sortOrder;
            if (a[sortCol] < b[sortCol]) return 1 * sortOrder;
            return 0;
        };
    }

    const handleChange = (e) => {
        setSortCol(e.target.value);
    };

    const handleSort = (header) => { // New function to handle sorting
        setSortCol(header);
        setSortOrder(sortOrder * -1); // Toggle the sort order
    };

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const headers = Object.keys(data[0]);

    return (
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
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, index) => (
                                <td key={index}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Rankings;