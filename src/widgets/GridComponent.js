import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// Create new GridExample component
const GridExample = () => {
    const [columnDefs, setColumnDefs] = useState([
        // 'category' columns
        { field: "athlete", chartDataType: "category" },
        { field: "age", chartDataType: "category" },
        { field: "country" },

        // 'excluded' from charts
        { field: "date", chartDataType: "excluded" },

        // 'series' columns
        { field: "gold", chartDataType: "series" },
        { field: "silver" },
    ]);

    <AgGridReact columnDefs={columnDefs} />;
};

export default GridExample;
