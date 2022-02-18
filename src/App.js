import React, { useState } from "react";
import "./App.css";

function App() {
    const [scores, setScores] = useState([]);
    const [meValue, setMeValue] = useState("");
    const [youValue, setYouValue] = useState("");
    const [globalScore, setGlobalScore] = useState({ globalMe: 0, globalYou: 0 });

    const handleMeChange = e => {
        console.log(e.target.value);
        setMeValue(e.target.value);
    };

    const handleYouChange = e => {
        setYouValue(e.target.value);
    };

    const reset = () => {
        setScores([]);
        setGlobalScore({ globalMe: 0, globalYou: 0 });
    };

    const handleMeClick = e => {
        if (!!meValue) {
            const newScores = [...scores];
            newScores.push({ me: meValue, you: 0 });
            setScores(newScores);
            setMeValue("");
            const data = newScores.reduce(
                (acc, current) => {
                    acc.globalMe += +current.me;
                    acc.globalYou += +current.you;
                    return acc;
                },
                { globalMe: 0, globalYou: 0 }
            );
            setGlobalScore(data);
        }
    };

    const handleYouClick = e => {
        if (!!youValue) {
            const newScores = [...scores];
            newScores.push({ me: 0, you: youValue });
            setScores(newScores);
            setYouValue("");
            const data = newScores.reduce(
                (acc, current) => {
                    acc.globalMe += +current.me;
                    acc.globalYou += +current.you;
                    return acc;
                },
                { globalMe: 0, globalYou: 0 }
            );
            setGlobalScore(data);
        }
    };

    return (
        <div className="App">
            <div>
                <input type="number" value={meValue} onChange={handleMeChange} placeholder="me" />{" "}
                <button onClick={handleMeClick}>Add</button>
            </div>
            <div>
                <input type="number" value={youValue} onChange={handleYouChange} placeholder="you" />{" "}
                <button onClick={handleYouClick}>Add</button>
            </div>
            <div style={{ color: `${globalScore.globalMe - globalScore.globalYou >= 0 ? "blue" : "red"}` }}>
                {globalScore.globalMe - globalScore.globalYou}
            </div>
            <div>
                <span>{globalScore.globalMe}</span> : <span>{globalScore.globalYou}</span>
                <button style={{ marginLeft: "10px" }} onClick={reset}>
                    Reset
                </button>
            </div>
            <div>
                {scores.length !== 0 &&
                    scores.map(({ me, you }, index) => (
                        <div style={{ display: "flex" }} key={index}>
                            <input type="number" value={me} disabled />
                            <input type="number" value={you} disabled />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default App;
