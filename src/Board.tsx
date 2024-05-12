// @ts-nocheck
import { useEffect, useState } from "react";
// import { Button } from "./Button";
import "./Board.css";

interface buttonItem {
  text: string;
  match: string;
  state: string;
}

function buttonColor(state) {
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

  // called only on the first render
  useEffect(() => {
    const dataMap = new Map();
    data.forEach((item) => {
      dataMap.set(item.country, item.capital);
    });
    const dataArray = Array.from(dataMap, ([key, value]) => ({ key, value }));
    setCountryCapital(dataArray);
  }, []);

  // called everytime the countryCapital is changed
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
    // clicking first button
    if (chosenButtons.length === 0) {
      let activeButton = clickedButton;
      activeButton.state = "active";
      setChosneButtons([clickedButton]);
      return;
    }

    if (chosenButtons.length === 1) {
      // unclicking a button
      if (chosenButtons[0].text === clickedButton.text) {
        let unActiveButton = clickedButton;
        unActiveButton.state = "default";
        setChosneButtons([]);
        return;
      } else if (chosenButtons[0].match == clickedButton.text) {
        // choosing the match
        setButtons(
          buttons.filter(
            (item) =>
              item.text !== clickedButton.text &&
              item.match !== clickedButton.text
          )
        );
        setChosneButtons([]);
      } else {
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

// import { useState } from "react";
// import { Button } from "./Button";
// import "./Board.css";

// function shuffle(array: any) {
//   return array.sort(() => Math.random() - 0.5);
// }

// export const Board = () => {
//   const countryCapital = new Map<String, String>([
//     ["Israel", "Jerusalem"],
//     ["France", "Paris"],
//     ["England", "London"],
//     ["Italy", "Rome"],
//     ["Spain", "Madrid"],
//   ]);

//   const [countries, setCountries] = useState(() =>
//     shuffle(Array.from(countryCapital.keys()))
//   ); //to change?
//   const [capitals, setCapitals] = useState(() =>
//     shuffle(Array.from(countryCapital.values()))
//   ); //to change?

//   const [chosenButton, setChosneButton] = useState("");

//   function handleChosneButton(buttonName: any) {
//     if (chosenButton == "") {
//       setChosneButton(buttonName);
//     } else {
//       if (
//         countryCapital.get(chosenButton) == buttonName ||
//         countryCapital.get(buttonName) == chosenButton
//       ) {
//         console.log("congratulations");
//         setChosneButton("");
//       }
//     }
//   }

//   const renderCountries = (countries: any) => {
//     return (
//       <div className="countries">
//         {countries.map((country: any) => (
//           <Button
//             key={country}
//             name={country}
//             sendDataToParent={handleChosneButton}
//           />
//         ))}
//       </div>
//     );
//   };

//   const renderCapitals = (capitals: any) => {
//     return (
//       <div className="capitals">
//         {capitals.map((capital: any) => (
//           <Button
//             key={capital}
//             name={capital}
//             state={"default"}
//             sendDataToParent={handleChosneButton}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="board">
//       {renderCountries(countries)}
//       {renderCapitals(capitals)}
//     </div>
//   );
// };
