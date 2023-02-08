import "./gamePlate.scss";
import { useState, useEffect } from "react";
import ColorCard from "../ColorCard/colorCard.tsx";
import timeout from "../../utils/util";
import { UserService } from "../../sevices/gameService/gameService";

export const GamePlate = () => {
  const userService = new UserService();
  const [isOn, setIsOn] = useState(false);
  const colorList = ["green", "red", "yellow", "blue"];
  const [higheScore, setHigheScore] = useState("");

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState("");

  const startHandle = () => {
    setIsOn(true);
  }

  const getScore = async () => {
    const userData = await userService.getScore();
    if (!userData) {
      setHigheScore(0);
      const userData = await userService.addIteam();
    }
    setHigheScore(userData.score);
  };

  const checkIfItChanges = async () => {
    if (play.score > higheScore) {
      const highes = await userService
        .changeScore({ score: play.score })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      setHigheScore(highes.score);
    } else {
      return console.log("next");
    }
  };

  useEffect(() => {
    checkIfItChanges();
    return () => {
      console.log("is Checking");
    };
  }, [play.score]);

  useEffect(() => {
    getScore();
    return () => {
      console.log("is Checking");
    };
  }, []);

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  const displayColors = async () => {
    await timeout(500);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(500);
      setFlashColor("");
      await timeout(500);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  };

  const cardClickHandle = async (color) => {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(1000);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(1000);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(1000);
      setFlashColor("");
    }
  };

  const closeHandle = () => {
    setIsOn(false);
  };

  return (
    <>
      <div className="start">
        <header className="start-header">
          <div className="cardWrapper">
            {colorList &&
              colorList.map((v, i) => (
                <ColorCard flash={flashColor === v} color={v} onClick={() => {cardClickHandle(v);}}></ColorCard>
              ))}
          </div>

          {isOn && !play.isDisplay && !play.userPlay && play.score && (
            <div className="lost">
              <div>FinalScore: {play.score}</div>
              <button onClick={closeHandle}>Close</button>
            </div>
          )}
          {!isOn && !play.score && (
            <button onClick={startHandle} className="startButton">
              Start
            </button>
          )}
          {isOn && (play.isDisplay || play.userPlay) && (
            <div className="score">{play.score}</div>
          )}
          <div>
            <h2>highest Score : {higheScore}</h2>
          </div>
        </header>
      </div>
    </>
  );
};
