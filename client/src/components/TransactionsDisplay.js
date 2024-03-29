import React from 'react'
import { ReactGrid} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

const TransactionsDisplay = ({
  transactionArr,
  operatingBalance,
  funding,
  expenditure,
  positiveBalance,
}) => {
  
  const getColumns = () => [
    { columnId: "user", width: 75 },
    { columnId: "date", width: 150 },
    { columnId: "Item", width: 75 },
    { columnId: "name", width: 175 },
    { columnId: "description", width: 275 },
    { columnId: "cr", width: 100 },
    { columnId: "dr", width: 100 },
    { columnId: "status", width: 75 },
  ];

  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "User" },
      { type: "header", text: "Date" },
      { type: "header", text: "Item" },
      { type: "header", text: "Name" },
      { type: "header", text: "Description" },
      { type: "header", text: "Cr" },
      { type: "header", text: "Dr" },
      { type: "header", text: "Status" },
    ],
  };
  const sumOfValuesRow = [
    {
      rowId: "sumOfValuesRow",
      cells: [
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: funding },
        { type: "text", text: expenditure },
        { type: "text", text: "" },
      ],
    },
  ];
  const operatingBalanceRow = [
    {
      rowId: "operatingBalanceRow ",
      cells: [
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "" },
        { type: "text", text: "Operating Balance" },
        {
          type: "text",
          text: positiveBalance ? operatingBalance : "",
        },
        {
          type: "text",
          text: positiveBalance ? "" : operatingBalance,
        },
        { type: "text", text: "" },
      ],
    },
  ];

  const getRows = (transactions) => [
    headerRow,
    ...transactions.map((transaction, idx) => ({
      rowId: idx,
      cells: [
        { type: "text", text: transaction.createdBy },
        { type: "text", text: transaction.transactionDate },
        { type: "text", text: transaction.feature ? "feature" : "project" },
        {
          type: "text",
          text: transaction.feature ? transaction.feature : transaction.project,
        },
        {
          type: "text",
          text: transaction.description || transaction.transaction_type,
        },
        {
          type: "text",
          text:
            transaction.transaction_action === "cr" ? transaction.amount : "",
        },
        {
          type: "text",
          text:
            transaction.transaction_action === "dr" ? transaction.amount : "",
        },

        { type: "text", text: transaction.status },
      ],
    })),
    ...sumOfValuesRow,
    ...operatingBalanceRow,
  ];
  const rows = getRows(transactionArr);
  const columns = getColumns();



    const mobileHeaderRow = {
      rowId: "mobileHeader",
      cells: [
        { type: "header", text: "Total Funding" },
        { type: "header", text: "Total Expenditure" },
        { type: "header", text: "Balance" },
      ],
    };

      const mobileValuesRow = [
        {
          rowId: "mobileValuesRow",
          cells: [
            
            { type: "text", text: funding },
            { type: "text", text: expenditure },
            { type: "text", text: operatingBalance },
          ],
        },
      ];
       const getMobileColumns = () => [
         { columnId: "Total Funding", width: 100 },
         { columnId: "Total Expenditure", width: 125
         },
         { columnId: "Balance", width: 100 },
       ];

        const getMobilesRows = () => [mobileHeaderRow, ...mobileValuesRow];
        const mobileRows = getMobilesRows();
        const mobileColumns = getMobileColumns();

  return (
    <>
      <div className='show-transaction-history'>
        <ReactGrid rows={rows} columns={columns} />
      </div>
      <div className='hide-transaction-history'>
        <ReactGrid rows={mobileRows} columns={mobileColumns} />
      </div>
    </>
  );
};

export default TransactionsDisplay