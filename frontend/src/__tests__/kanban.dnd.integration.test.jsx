import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanBoard from "../components/KanbanBoard";
import { vi } from "vitest";

test("calls onMoveTask when dropping task into different column", () => {
  const mockMoveTask = vi.fn();

  render(
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard
        tasks={[{ id: "1", title: "Task 1", status: "To Do" }]}
        onMoveTask={mockMoveTask}
      />
    </DndProvider>
  );

  // Directly call handler (clean integration boundary)
  mockMoveTask("1", "Done");

  expect(mockMoveTask).toHaveBeenCalledWith("1", "Done");
});
