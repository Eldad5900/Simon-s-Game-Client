import { useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import  BigButton  from "../../UI/BigButton/bigButton.tsx";
import React from "react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="title">
        <section className="wrapper">
          <div className="top">Semon's Game</div>
          <div className="bottom" aria-hidden="true">
            Semon's Game
          </div>
        </section>
      </div>
      <div>
        <h1>Do What Simon Says ...</h1>
      </div>
      <div>
        <BigButton label=": : play : :" onClick={() => navigate("/Game-Start")}> </BigButton>
      </div>
    </div>
  );
};
