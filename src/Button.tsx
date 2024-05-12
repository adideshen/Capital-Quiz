// @ts-nocheck
import { useState } from "react";
import "./Card.css";

export const Button = ({ name, state }: any) => {
  const [cardState, setCardState] = useState(state);

  const buttonColor = {
    backgroundColor:
      cardState === "default"
        ? "lightgrey"
        : cardState === "active"
        ? "blue"
        : cardState === "error"
        ? "red"
        : "lightgrey",
  };

  function handleClick() {
    if (cardState === "default") {
      setCardState("active");
    } else {
      setCardState("default");
    }
  }

  return (
    <button className={name} onClick={handleClick} style={buttonColor}>
      {name}
    </button>
  );
};


// import { useState } from "react";
// import "./Card.css";

// export const Button = ({ name, state, sendDataToParent }: any) => {
//   const [cardState, setCardState] = useState(state);

//   const buttonColor = {
//     backgroundColor:
//       cardState === "default"
//         ? "lightgrey"
//         : cardState === "active"
//         ? "blue"
//         : cardState === "error"
//         ? "red"
//         : "lightgrey",
//   };

//   function handleClick() {
//     if (cardState === "default") {
//       setCardState("active");
//       sendDataToParent(name, setCardState);
//     } else {
//       setCardState("default");
//       sendDataToParent("", setCardState);
//     }
//   }

//   return (
//     <button className={name} onClick={handleClick} style={buttonColor}>
//       {name}
//     </button>
//   );
// };
