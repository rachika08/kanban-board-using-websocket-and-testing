import { render, screen,fireEvent} from "@testing-library/react";
import  userEvent from "@testing-library/user-event";
import KanbanBoard from "../components/KanbanBoard";
import { expect, vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const mockTasks = [];
describe("KanbanBoard Rendering", () => {
    test("renders all columns", () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <KanbanBoard
                    tasks={mockTasks}
                    onAddTask={() => { }}
                    onDeleteTask={() => { }}
                    onMoveTask={() => { }}
                    onUpdateTask={() => { }}

                />
            </DndProvider>
        );

        expect(screen.getByText("To Do")).toBeInTheDocument();
        expect(screen.getByText("In Progress")).toBeInTheDocument();
        expect(screen.getByText("Done")).toBeInTheDocument();
    });

    //add task
    test("calls onAddTask when adding a new task", () => {
        const mockOnAddTask = vi.fn();

        render(
            <DndProvider backend={HTML5Backend}>
                <KanbanBoard
                    tasks={mockTasks}
                    onAddTask={mockOnAddTask}
                    onDeleteTask={() => { }}
                    onUpdateTask={() => { }}
                    onMoveTask={() => { }}
                />
            </DndProvider>
        );

        const input = screen.getByPlaceholderText(/Task title/i);
        fireEvent.change(input, { target: { value: "New Task" } });

        const addButton = screen.getByRole("button", { name: /Add Task/i });
        fireEvent.click(addButton);

        expect(mockOnAddTask).toHaveBeenCalledTimes(1);
        expect(mockOnAddTask).toHaveBeenCalledWith(
            expect.objectContaining({
                title: "New Task"
            })
        );
    });

    //delete test
    test("callsOnDeleteTask when deleting a task",()=>{
        const mockOnDeleteTask=vi.fn();
        const task={
            id:'1',
            title:"task to delete",
            status:"To Do"
        }
        render(
            <DndProvider backend={HTML5Backend}>
            
                <KanbanBoard 
                tasks={[task]}
                onAddTask={()=>{}}
                onDeleteTask={mockOnDeleteTask}
                onMoveTask={()=>{}}
                onUpdateTask={()=>{}}
                />
            
            </DndProvider>)
        
        const deletebtn=screen.getByRole("button",{name:/delete/i});
        fireEvent.click(deletebtn);

        expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockOnDeleteTask).toHaveBeenCalledWith("1");
    });
    //update test
    test("callsOnUpdateTask when updating a task",async()=>{
        const mockOnUpdateTask=vi.fn();
        const task={
            id:"2",
            title:"edit task",
            status:"To Do"
        }
        render(
            <DndProvider backend={HTML5Backend}>
            
                <KanbanBoard 
                tasks={[task]}
                onAddTask={()=>{}}
                onDeleteTask={()=>{}}
                onMoveTask={()=>{}}
                onUpdateTask={mockOnUpdateTask}
                />
            
            </DndProvider>)
        const editbtn=screen.getByRole("button", {name:/edit/i});
        await userEvent.click(editbtn);

        const input=screen.getByDisplayValue("edit task");
        // fireEvent.change(input,{target:{value:"editted task"}});
        await userEvent.clear(input);
        await userEvent.type(input, "editted task");
        const savebtn=screen.getByRole("button", {name:/Save/i});
        await userEvent.click(savebtn);

        console.log(mockOnUpdateTask.mock.calls);

        expect(mockOnUpdateTask).toHaveBeenCalledTimes(1);
        expect(mockOnUpdateTask).toHaveBeenCalledWith(
            
            expect.objectContaining({
                id:"2",
                title:"editted task"
            })
        )

    })

});
