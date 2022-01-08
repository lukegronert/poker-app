import React from 'react';
import EntryForm from '../components/EntryForm';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const { 
    REACT_APP_SHEET_ID,
    REACT_APP_GOOGLE_CLIENT_EMAIL,
    REACT_APP_GOOGLE_PRIVATE_KEY
    } = process.env;
const doc = new GoogleSpreadsheet(`${process.env.REACT_APP_SHEET_ID}`);
console.log(process.env.REACT_APP_SHEET_ID)

export default function Scoreboard() {
    return (
        <div>
            Scoreboard
            <EntryForm />
        </div>
    )
}
