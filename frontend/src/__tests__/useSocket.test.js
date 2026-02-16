import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useSocket } from "../hooks/useSocket";

let handlers = {};
let mockSocket;

vi.mock("socket.io-client", () => ({
  io: vi.fn(() => {
    handlers = {};

    mockSocket = {
      on: vi.fn((event, callback) => {
        handlers[event] = callback;
      }),
      off: vi.fn(),
    };

    return mockSocket;
  }),
}));

describe("useSocket hook", () => {

  test("creates socket connection", () => {
    renderHook(() => useSocket());
    expect(mockSocket).toBeDefined();
  });

  test("handles sync:tasks event", () => {
    const { result } = renderHook(() => useSocket());

    const fakeTasks = [{ id: "1", title: "Task 1" }];

    act(() => {
      handlers["sync:tasks"](fakeTasks);
    });

    expect(result.current.tasks).toEqual(fakeTasks);
    expect(result.current.loading).toBe(false);
  });

  test("handles task:created event", () => {
    const { result } = renderHook(() => useSocket());

    const newTask = { id: "2", title: "New Task" };

    act(() => {
      handlers["task:created"](newTask);
    });

    expect(result.current.tasks).toContainEqual(newTask);
  });

  test("handles task:deleted event", () => {
    const { result } = renderHook(() => useSocket());

    const initialTasks = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];

    // first sync tasks
    act(() => {
      handlers["sync:tasks"](initialTasks);
    });

    // delete one task
    act(() => {
      handlers["task:deleted"]("1");
    });

    expect(result.current.tasks).toEqual([
      { id: "2", title: "Task 2" },
    ]);
  });

  test("cleans up socket listeners on unmount", () => {
    const { unmount } = renderHook(() => useSocket());

    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith("sync:tasks");
    expect(mockSocket.off).toHaveBeenCalledWith("task:created");
    expect(mockSocket.off).toHaveBeenCalledWith("task:deleted");
  });

});
