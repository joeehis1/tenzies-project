import { useEffect, useState } from "react";
import { timerOutput } from "./timerOutput";
import Timer from "./components/Timer";
import DiceComponent from "./components/DiceComponent";
import ScoreTable from "./components/ScoreTable";

function App() {
    const [gameEnded, setGameEnded] = useState(false);
    const [count, setCount] = useState(0);
    const [diceCollection, setDiceCollection] = useState(
        generateDiceCollection()
    );
    const [gamesPlayed, setGamesPlayed] = useState(
        (function () {
            const games = JSON.parse(localStorage.getItem("games"));
            return games;
        })() ?? []
    );
    const [isVisible, setIsVisible] = useState(false);

    function generateDiceCollection() {
        return new Array(10).fill(null).map(() => {
            return {
                number: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: crypto.randomUUID(),
            };
        });
    }

    function rollDice() {
        if (gameEnded) {
            setDiceCollection(generateDiceCollection());
            setGameEnded(false);
            setCount(0);
            return;
        }
        setDiceCollection((collection) => {
            const newCollection = [...collection].map((die) => {
                const newDie = { ...die };
                newDie.number = newDie.isHeld
                    ? newDie.number
                    : Math.floor(Math.random() * 6) + 1;
                return newDie;
            });
            return newCollection;
        });
    }

    useEffect(() => {
        const allEqual = diceCollection.every((die) => {
            return (
                die.isHeld === true && die.number === diceCollection[0].number
            );
        });

        if (allEqual) {
            setGameEnded(true);
            updateGamesPlayed();
            localStorage.setItem("games", JSON.stringify(gamesPlayed));
        }
    }, [diceCollection]);

    function updateGamesPlayed() {
        const newGame = {
            id: crypto.randomUUID(),
            gameDuration: count,
            displayedTime: timerOutput(count),
            day: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };
        setGamesPlayed((games) => {
            return [...games, newGame].sort((a, b) => {
                return a.gameDuration < b.gameDuration
                    ? -1
                    : a.gameDuration > b.gameDuration
                    ? 1
                    : 0;
            });
        });
    }

    return (
        <>
            <div className="app-wrapper">
                <header>
                    <h1>Tenzies</h1>
                </header>
                <section>
                    <p className="instructions">
                        Roll until all dice are the same. Click each die to
                        freeze it at its current value between rolls.
                    </p>
                    <DiceComponent
                        setDiceCollection={setDiceCollection}
                        diceCollection={diceCollection}
                    />
                    <button className="btn btn-ctrl" onClick={rollDice}>
                        {gameEnded ? "Reset Game" : "Roll"}
                    </button>
                    <button
                        className="btn-ctrl"
                        disabled={gamesPlayed.length <= 0}
                        onClick={() => setIsVisible((boolean) => !boolean)}
                    >
                        {isVisible ? "Hide Scores" : "Show Scores"}
                    </button>
                </section>
                {/* To display the time */}
                <Timer
                    count={count}
                    setCount={setCount}
                    gameEnded={gameEnded}
                />
                {/* To display the scores */}
                {gamesPlayed.length > 0 && (
                    <ScoreTable
                        isVisible={isVisible}
                        gamesPlayed={gamesPlayed}
                    />
                )}
            </div>
        </>
    );
}

export default App;
