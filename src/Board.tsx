// @ts-nocheck
import { useEffect, useState } from "react";
import "./Board.css";

interface buttonItem {
  text: string;
  match: string;
  state: string;
}

function buttonColor(state: any) {
  if (state === "active") {
    return "blue";
  } else if (state === "error") {
    return "red";
  }
  return "lightgrey";
}

function shuffle(array: any) {
  return array.sort(() => Math.random() - 0.5);
}

export const Board = ({ data }) => {
  const [countryCapital, setCountryCapital] = useState([]);
  const [buttons, setButtons] = useState(new Array());
  const [chosenButtons, setChosneButtons] = useState([]);
  const [disableAllButtons, setDisableAllButtons] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const dataMap = new Map();
    data.forEach((item) => {
      dataMap.set(item.country, item.capital);
    });
    const dataArray = Array.from(dataMap, ([key, value]) => ({ key, value }));
    setCountryCapital(dataArray);
  }, []);

  // updating the buttons after
  useEffect(() => {
    const changedButtons = [];
    countryCapital.forEach((item) => {
      changedButtons.push({
        text: item.key,
        match: item.value,
        state: "default",
      });
      changedButtons.push({
        text: item.value,
        match: item.key,
        state: "default",
      });
    });
    setButtons(shuffle(changedButtons));
  }, [countryCapital]);

  function disableButtons(button1, button2) {
    setDisableAllButtons(true);
    setTimeout(function () {
      setDisableAllButtons(false);
      button1.state = "default";
      button2.state = "default";
    }, 3000);
  }

  function handleClick(clickedButton) {
    if (chosenButtons.length === 0) {
      // clicking first button
      let activeButton = clickedButton;
      activeButton.state = "active";
      setChosneButtons([clickedButton]);
      return;
    }

    if (chosenButtons.length === 1) {
      if (chosenButtons[0].text === clickedButton.text) {
        // unclicking a button
        let unActiveButton = clickedButton;
        unActiveButton.state = "default";
        setChosneButtons([]);
        return;
      } else if (chosenButtons[0].match == clickedButton.text) {
        // choosing the matched button
        setButtons(
          buttons.filter(
            (item) =>
              item.text !== clickedButton.text &&
              item.match !== clickedButton.text
          )
        );
        setChosneButtons([]);
      } else {
        // not choosing the matched button
        let errorButton = clickedButton;
        errorButton.state = "error";
        let chosenButton = chosenButtons[0];
        chosenButton.state = "error";
        setChosneButtons([errorButton, chosenButton]);
        disableButtons(clickedButton, chosenButtons[0]);
      }
    } else {
      chosenButtons.forEach((item) => {
        item.state = "default";
      });
      let activeButton = clickedButton;
      activeButton.state = "active";
      setChosneButtons([activeButton]);
    }

    if (buttons.length === 2) {
      setGameFinished(true);
    }
  }

  return (
    <div>
      {buttons.map((item) => (
        <button
          key={item.key}
          className={"button " + item.state.toString()}
          onClick={() => handleClick(item)}
          style={{ backgroundColor: buttonColor(item.state) }}
          disabled={disableAllButtons}
        >
          {item.text}
        </button>
      ))}
      {gameFinished && <div className="finish"> Congratulations! </div>}
    </div>
  );
};