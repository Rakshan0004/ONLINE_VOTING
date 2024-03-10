import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import Countdown from 'react-countdown';
import { VotingContext } from "../context/voter";
import Style from '../styles/index.module.css';
import Card from "../components/Card/Card.jsx";
import image from "../assets/candidate-1.jpg";

const index = () => {
  const {votingTitle} = useContext(VotingContext);
  return 
    <div>
      {votingTitle}
    </div>;
};
export default index;
