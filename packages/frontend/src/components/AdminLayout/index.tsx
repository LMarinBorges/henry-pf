import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const NAVBAR_HEIGHT = "48px";

export default function AdminLayout() {
  return (
    <>
      <Navbar height={NAVBAR_HEIGHT} />
      <Container
        size="sm"
        px="3"
        pb="3"
        pt={`calc(${NAVBAR_HEIGHT} + var(--chakra-sizes-3))`}
      >
        <Outlet />
      </Container>
    </>
  );
}
