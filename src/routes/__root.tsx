import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <>
          <Navbar />
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </>
      </Container>
      <Toaster theme="light" />
      <TanStackRouterDevtools />
    </>
  ),
});
