import { useEffect, useState } from "react";
import "./Board.css";

interface buttonItem {
  text: string;
  match: string;
  state: string;
}

function buttonColor(state: string): string {
  if (state === "active") {
    return "blue";
  } else if (state === "error") {
    return "red";
  }
  return "lightgrey";
}

function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

export const Board = ({
  data,
}: {
  data: { country: string; capital: string }[];
}) => {
  const [countryCapital, setCountryCapital] = useState<
    { key: string; value: string }[]
  >([]);
  const [buttons, setButtons] = useState<buttonItem[]>([]);
  const [chosenButtons, setChosenButtons] = useState<buttonItem[]>([]);
  const [disableAllButtons, setDisableAllButtons] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const dataMap = new Map();
    data.forEach((item) => {
      dataMap.set(item.country, item.capital);
    });
    const dataArray = Array.from(dataMap, ([key, value]) => ({ key, value }));
    setCountryCapital(dataArray);
  }, []);

  useEffect(() => {
    const changedButtons: buttonItem[] = [];
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

  function disableButtons(button1: buttonItem, button2: buttonItem) {
    setDisableAllButtons(true);
    setTimeout(function () {
      setDisableAllButtons(false);
      button1.state = "default";
      button2.state = "default";
      setChosenButtons([]);
    }, 3000);
  }

  function handleClick(clickedButton: buttonItem) {
    if (chosenButtons.length === 0) {
      // clicking first button
      let activeButton = clickedButton;
      activeButton.state = "active";
      setChosenButtons([clickedButton]);
      return;
    }

    if (chosenButtons.length === 1) {
      if (chosenButtons[0].text === clickedButton.text) {
        // unclicking a button
        let unActiveButton = clickedButton;
        unActiveButton.state = "default";
        setChosenButtons([]);
        return;
      } else if (chosenButtons[0].match == clickedButton.text) {
        // choosing the matching button
        setButtons(
          buttons.filter(
            (item) =>
              item.text !== clickedButton.text &&
              item.match !== clickedButton.text
          )
        );
        setChosenButtons([]);
      } else {
        // not choosing the matching button
        let firstButton = chosenButtons[0];
        firstButton.state = "error";
        let secondButton = clickedButton;
        secondButton.state = "error";
        setChosenButtons([firstButton, secondButton]);
        disableButtons(clickedButton, chosenButtons[0]);
      }
    }

    if (buttons.length === 2) {
      // The last click selected the last matching pair
      setGameFinished(true);
    }
  }

  return (
    <div>
      {buttons.map((item) => (
        <button
          key={item.text}
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
