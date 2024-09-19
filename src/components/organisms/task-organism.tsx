"use client";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useEffect, useState } from "react";
import { InformationMolecule } from "../molecules/information-molecule";
import StatusMolecule from "../molecules/status-molecule";
import LoadingSkeleton from "../atoms/loading-skeleton-atom";
import { useClient } from "@/hooks/useClient";
import MoreOptionsMolecule from "../molecules/more-options-molecule";

export default function TaskOrganism() {
  const { tasks } = useTaskStore();

  const { fetchTasks } = useTaskStore();

  const isClient = useClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isClient) {
      const loadTasks = async () => {
        try {
          await fetchTasks();
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadTasks();
    }
  }, [fetchTasks, isClient]);

  if (!isClient) return null;

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <ul className="gap-4 flex flex-col md:grid md:grid-cols-3 md:gap-6">
          {tasks?.map((task) => (
            <li
              key={task?.id}
              className={`p-4 flex justify-between items-center relative	 ${
                task?.status === "COMPLETED"
                  ? "bg-emerald-50"
                  : task?.status === "IN_PROGRESS"
                  ? "bg-indigo-50"
                  : "bg-amber-100"
              }`}
            >
              <div>
                <StatusMolecule status={task?.status} />
              </div>
              <div>
                <InformationMolecule
                  title={task?.title}
                  description={task?.description}
                />
              </div>
              <MoreOptionsMolecule taskId={task?.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
