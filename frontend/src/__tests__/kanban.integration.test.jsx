import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "../App";

let sockets = [];
let allSockets = [];

vi.mock("socket.io-client", () => ({
  io: vi.fn(() => {
    const handlers = {};

    const mockSocket = {
      on: vi.fn((event, callback) => {
        handlers[event] = callback;
      }),
      off: vi.fn(),
      emit: vi.fn(),
      __handlers: handlers,
    };

    allSockets.push(mockSocket);
    return mockSocket;
  }),
}));


describe("WebSocket integration - multi client sync", () => {

  test("syncs tasks across multiple clients", async () => {

    render(
      <DndProvider backend={HTML5Backend}>
        <App />
        <App />
      </DndProvider>
    );

    const fakeTasks = [
      { id: "1", title: "Shared Task", status: "To Do" },
    ];

    act(() => {
      allSockets.forEach((socket) => {
        socket.__handlers["sync:tasks"]?.([
          { id: "1", title: "Shared Task", status: "To Do" }
        ]);
      });
    });

    const tasks = await screen.findAllByText("Shared Task");

    expect(tasks.length).toBe(2);
  });

});
