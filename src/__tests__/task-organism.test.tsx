import { render, screen, waitFor, act } from "@testing-library/react";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useClient } from "@/hooks/useClient";
import '@testing-library/jest-dom';
import TaskOrganism from "@/components/organisms/task-organism";

jest.mock("../stores/tasks/tasks.store", () => ({
  useTaskStore: jest.fn(),
}));

jest.mock("../hooks/useClient", () => ({
  useClient: jest.fn(),
}));

describe("TaskOrganism", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render LoadingSkeleton while loading", async () => {
    (useTaskStore as jest.MockedFunction<typeof useTaskStore>).mockReturnValue({
      tasks: [],
      fetchTasks: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 1000))),
    });
    (useClient as jest.Mock).mockReturnValue(true);

    await act(async () => {
      render(<TaskOrganism />);
    });

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
    });
  });

  it("should render tasks when loaded", async () => {
    const mockTasks = [
      { id: 1, status: "IN_PROGRESS", title: "Task 1", description: "Description 1" },
      { id: 2, status: "COMPLETED", title: "Task 2", description: "Description 2" },
    ];

    const fetchTasksMock = jest.fn(() => Promise.resolve());
    (useTaskStore as jest.MockedFunction<typeof useTaskStore>).mockReturnValue({
      tasks: mockTasks,
      fetchTasks: fetchTasksMock,
    });
    (useClient as jest.Mock).mockReturnValue(true);

    await act(async () => {
      render(<TaskOrganism />);
    });

    await waitFor(() => {
      expect(fetchTasksMock).toHaveBeenCalled(); // Asegúrate de que `fetchTasks` se haya llamado
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });


  it("should not render anything if not client", () => {
    (useClient as jest.Mock).mockReturnValue(false);

    const { container } = render(<TaskOrganism />);

    expect(container).toBeEmptyDOMElement();
  });
});
