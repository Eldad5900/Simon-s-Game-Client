import { useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { BigButton } from "../../UI/BigButton/bigButton";
import React from "react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="title">
        <section class="wrapper">
          <div class="top">Semon's Game</div>
          <div class="bottom" aria-hidden="true">
            Semon's Game
          </div>
        </section>
      </div>
      <div>
        <h1>Do What Simon Says ...</h1>
      </div>
      <div>
        <BigButton onClick={() => navigate("/Game-Start")}>
          : : play : :
        </BigButton>
      </div>
    </div>
  );
};
