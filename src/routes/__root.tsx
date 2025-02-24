import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <>
          <Navbar />
          <Outlet />
        </>
      </Container>

      <TanStackRouterDevtools />
    </>
  ),
});
