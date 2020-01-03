import React from "react";
import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

import logo from "../../assets/logo.svg";
import camera from "../../assets/camera.svg";

export default function Header() {
  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="Instaclone" />
        </Link>
        <Link to="new">
          <img src={camera} alt="Enviar publicação" />
        </Link>
      </Content>
    </Container>
  );
}
