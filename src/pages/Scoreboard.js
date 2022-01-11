import React, {useEffect, useState} from 'react';
import EntryForm from '../components/EntryForm';
import PlayerCard from '../components/PlayerCard';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const {REACT_APP_SHEET_ID} = process.env;
const {REACT_APP_GOOGLE_CLIENT_EMAIL} = process.env;
const {REACT_APP_GOOGLE_PRIVATE_KEY} = process.env;

const doc = new GoogleSpreadsheet(REACT_APP_SHEET_ID);

(async function() {
    await doc.useServiceAccountAuth({
        // env var values are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        client_email: REACT_APP_GOOGLE_CLIENT_EMAIL,
        private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
}())


export default function Scoreboard() {
    const [currentSheet, setCurrentSheet] = useState({});
    const [currentRows, setCurrentRows] = useState([])

    const loadSheet = async () => {
        await doc.loadInfo()
            .then((response) => {
                setCurrentSheet(doc.sheetsByIndex[0]);
            })
    }

    const addRow = async (pName, buyInAmount) => {
        const sheet = doc.sheetsByIndex[0];
        const newRow = await sheet.addRow({ playerName: pName, buyIn: buyInAmount });
        setCurrentSheet(sheet)
    }
    const getRows = async () => {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows()
        setCurrentRows(rows)
    }

    const addRebuy = async (playerName) => {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        for (let i = 0; i < rows.length; i++) {
            if(rows[i].playerName === playerName) {
                rows[i].buyIn = Number(rows[i].buyIn) + 20
                console.log(rows[i].buyIn)
                await rows[i].save()
            }
        }
    }
    
    const removePlayer = async (playerName) => {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        for (let i = 0; i < rows.length; i++) {
            if(rows[i].playerName === playerName) {
                rows[i].delete();
            }
        }
    }

    useEffect(() => {
        loadSheet()
    }, [])

    return (
        <div>
            Scoreboard
            <EntryForm addRow={addRow} />
            {currentSheet.title}
            <table>
            <tr>
                <th>Player Name</th>
                <th>Total Buy Ins</th>
                <th></th>
                <th></th>  
            </tr>
                {currentRows && currentRows.map((row) => {
                    return (
                        <PlayerCard playerName={row.playerName} totalBuyIns={row.buyIn}
                                    addRebuy={addRebuy} removePlayer={removePlayer}
                                    key={currentRows.indexOf(row)} />
                    )
                })}
            </table>
            <button onClick={() => getRows()}>Get Rows</button>
        </div>
    )
}
