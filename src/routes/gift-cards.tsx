import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/gift-cards")({
  component: () => <Outlet />,
});
