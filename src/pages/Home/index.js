import style from "./style.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tlogo from "../../images/tlogo.png";




export function Home() {
  return (
    <h1>oi home</h1>
  )
}
