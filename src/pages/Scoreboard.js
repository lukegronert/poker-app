import React, {useEffect, useState} from 'react';
import EntryForm from '../components/EntryForm';
import PlayerCard from '../components/NewTournamentPlayerCard';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Button, Input, Table, Dropdown } from 'semantic-ui-react';

import '../css/scoreboard.css';

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
    const [newTournamentName, setNewTournamentName] = useState('');
    const [tournamentName, setTournamentName] = useState('');
    const [currentRows, setCurrentRows] = useState([]);
    const [sheetNames, setSheetNames] = useState([]);
    const [tournamentPlayers, setTournamentPlayers] = useState([]);
    const [firstPlace, setFirstPlace] = useState('');
    const [secondPlace, setSecondPlace] = useState('');
    const [thirdPlace, setThirdPlace] = useState('');
    const [highHand, setHighHand] = useState('');
    const [totalPot, setTotalPot] = useState(0);
    const [firstPlacePercentage, setFirstPlacePercentage] = useState(0);
    const [secondPlacePercentage, setSecondPlacePercentage] = useState(0);
    const [thirdPlacePercentage, setThirdPlacePercentage] = useState(0);
    const [highHandPercentage, setHighHandPercentage] = useState(0);


    const loadSheet = async () => {
        await doc.loadInfo()
    }

    // If newTournamentName is declared, create a new sheet in doc with newTournamentName as the title
    const createNewSheet = async (newTournamentName) => {
        if(newTournamentName !== '') {
            const newSheet = await doc.addSheet({ title: `${newTournamentName}`, headerValues: ['playerName', 'buyIn', 'winnings'] });
            setTournamentName(newTournamentName)
        } else {
            console.log('No tournament name entered.')
        }
    }
    // Used when adding a player to the tournament, adds a row entry to the sheet with name and buyin amount
    const addRow = async (pName, buyInAmount) => {
        const sheet = doc.sheetsByTitle[tournamentName];
        const newRow = await sheet.addRow({ playerName: pName, buyIn: buyInAmount, winnings: 0 });
        getRows();
        getTotalPot();
    }
    //Retrieves rows from selected tournament sheet
    const getRows = async () => {
        const rows = await doc.sheetsByTitle[tournamentName].getRows()
        setCurrentRows(rows)
        let players = [];
        for (let i = 0; i<rows.length; i++) {
            players.push({
                key: rows[i].playerName,
                value: rows[i].playerName,
                text: rows[i].playerName
            })
        }
        setTournamentPlayers(players);
    }

    const addRebuy = async (playerName) => {
        const sheet = doc.sheetsByTitle[tournamentName];
        const rows = await sheet.getRows();
        for (let i = 0; i < rows.length; i++) {
            if(rows[i].playerName === playerName) {
                rows[i].buyIn = Number(rows[i].buyIn) + 20
                console.log(rows[i].buyIn)
                await rows[i].save()
                getRows();
                getTotalPot();
            }
        }
    }
    
    const removePlayer = async (playerName) => {
        const sheet = doc.sheetsByTitle[tournamentName];
        const rows = await sheet.getRows();
        for (let i = 0; i < rows.length; i++) {
            if(rows[i].playerName === playerName) {
                await rows[i].delete();
                getRows();
                getTotalPot();
            }
        }
    }
    // Takes all sheet titles (expect for the first one (Overall)) and sets state of sheetNames to an array of their titles
    const getAllSheetNames = () => {
        // Start with 1 to skip the Overall Sheet
        let i = 1;
        let sheetNameArr = [];
        while(doc.sheetsByIndex[i] !== undefined) {
            sheetNameArr.push({
                key: doc.sheetsByIndex[i].title,
                value: doc.sheetsByIndex[i].title,
                text: doc.sheetsByIndex[i].title
            })
            console.log(doc.sheetsByIndex[i].title)
            i++
        }
        setSheetNames(sheetNameArr)
    }

    const getTotalPot = async () => {
        const rows = await doc.sheetsByTitle[tournamentName].getRows()
        let pot=0;
        rows.map((row) => {
            pot += Number(row.buyIn);
        })
        setTotalPot(pot)
    }

    const submitWinnings = async () => {
        const rows = await doc.sheetsByTitle[tournamentName].getRows();
        if(firstPlace && firstPlacePercentage) {
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].playerName === firstPlace) {
                    rows[i].winnings = Number(rows[i].winnings) + Number((firstPlacePercentage / 100) * totalPot)
                    await rows[i].save()
                }
            }
        }
        if (secondPlace && secondPlacePercentage) {
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].playerName === secondPlace) {
                    rows[i].winnings = Number(rows[i].winnings) + Number((secondPlacePercentage / 100) * totalPot)
                    await rows[i].save()
                }
            }
        }
        if (thirdPlace && thirdPlacePercentage) {
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].playerName === thirdPlace) {
                    rows[i].winnings = Number(rows[i].winnings) + Number((thirdPlacePercentage/ 100) * totalPot)
                    await rows[i].save()
                }
            }
        }
        if (highHand && highHandPercentage) {
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].playerName === highHand) {
                    rows[i].winnings = Number(rows[i].winnings) + Number((highHandPercentage / 100) * totalPot)
                    await rows[i].save()
                }
            }
        }
        getRows()
    }

    const sendResultsToOverall = async () => {
        //current tournament sheet
        const currentSheet = doc.sheetsByTitle[tournamentName];
        //overall sheet
        const overallSheet = doc.sheetsByTitle['Overall'];
        //current tournament rows
        const rows = await currentSheet.getRows();
        //overall sheet rows
        const overallRows = await overallSheet.getRows();
        for (let i = 0; i < overallRows.length; i++) {
            for(let j=0; j < rows.length; j++) {
                //if row has same name as a player in the overall sheet, add the buyIn and winnings to that player on the overall sheet
                if(rows[j].playerName === overallRows[i].playerName) {
                    overallRows[i].buyIn = Number(rows[j].buyIn) + Number(overallRows[i].buyIn)
                    overallRows[i].winnings = Number(rows[j].winnings) + Number(overallRows[i].buyIn)
                    await overallRows[i].save()
                    //remove player from rows array after the data has been sent to the overall sheet
                    rows.splice(j, 1)
                }
            }
        }
        //take the remaining players that did not find a match on the overall sheet
        //make an entry for them
        for(let i=0; i < rows.length; i++) {
            const newRow = await overallSheet.addRow({ playerName: rows[i].playerName, buyIn: rows[i].buyIn, winnings: rows[i].winnings });
        }


    }

    // Loads the doc and filled sheetNames with all names of sheets in the doc
    useEffect(() => {
        loadSheet().then(response => getAllSheetNames())
    }, [])

    //Console.logs tournamentName whenever it changes
    useEffect(() => {
        console.log('rerender?')
        if(tournamentName !== "" && tournamentName !== '--Select a Tournament--') {
            getTotalPot()
            getRows()
        }
    }, [tournamentName])

    if (!tournamentName) {
        return (
            <div className="container">
                <section>
                    <Input placeholder="MonthYear" onChange={(e) => setNewTournamentName(e.target.value)} />
                    <Button primary onClick={() => createNewSheet(newTournamentName)}>Create New Tourament</Button>
                    <Dropdown search selection value={tournamentName} placeholder="Select Tournament" options={sheetNames} onChange={(e, {value}) => setTournamentName(value)} />
                </section>
            </div>
        )
     } else {
            return (
                <div className="container">
                    <section>
                        <Input placeholder="MonthYear" onChange={(e) => setNewTournamentName(e.target.value)} />
                        <Button primary onClick={() => createNewSheet(newTournamentName)}>Create New Tourament</Button>
                        <Dropdown search selection value={tournamentName} placeholder="Select Tournament" options={sheetNames} onChange={(e, {value}) => setTournamentName(value)} />
                    </section>
                    <EntryForm addRow={addRow} />
                    <h2>{tournamentName}</h2>
                    <div className="grid-container">
                        <div className="scoreboardGrid">
                            <div className="gridHeader">Name</div>
                            <div className="gridHeader"></div>
                            <div className="gridHeader"></div>
                            <div></div>
                    </div>
                            {currentRows && currentRows.map((row) => {
                                return (
                                    <PlayerCard playerName={row.playerName} totalBuyIns={row.buyIn} winnings={row.winnings}
                                                addRebuy={addRebuy} removePlayer={removePlayer}
                                                key={currentRows.indexOf(row)} />
                                )
                            })}
                    </div>
                    <Button onClick={() => getRows()}>Get Rows</Button>
                    <p> {totalPot}</p>
                    <div>
                        <label>Percentage</label>
                        <Input placeholder="Ex: 50" onChange={(e) => setFirstPlacePercentage(e.target.value)} />
                        <Dropdown search selection value={firstPlace} placeholder="Select Player" options={tournamentPlayers} onChange={(e, {value}) => setFirstPlace(value)} />
                    </div>
                    <div>
                        <label>Percentage</label>
                        <Input placeholder="Ex: 30" onChange={(e) => setSecondPlacePercentage(e.target.value)} />
                        <Dropdown search selection value={secondPlace} placeholder="Select Player" options={tournamentPlayers} onChange={(e, {value}) => setSecondPlace(value)} />
                    </div>
                    <div>
                        <label>Percentage</label>
                        <Input placeholder="Ex: 15" onChange={(e) => setThirdPlacePercentage(e.target.value)} />
                        <Dropdown search selection value={thirdPlace} placeholder="Select Player" options={tournamentPlayers} onChange={(e, {value}) => setThirdPlace(value)} />
                    </div>
                    <div>
                        <label>Percentage</label>
                        <Input placeholder="Ex: 5" onChange={(e) => setHighHandPercentage(e.target.value)} />
                        <Dropdown search selection value={highHand} placeholder="Select Player" options={tournamentPlayers} onChange={(e, {value}) => setHighHand(value)} />
                    </div>
                    <Button onClick={() => submitWinnings()}>Submit Winnings</Button>
                    <Button onClick={() => sendResultsToOverall()}>Send to Overall Scoreboard</Button>
                </div>
            )
        }
    }
