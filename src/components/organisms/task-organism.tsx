"use client";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { Suspense, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { InformationMolecule } from "../molecules/information-molecule";
import StatusMolecule from "../molecules/status-molecule";
import LoadingSkeleton from "../atoms/loading-skeleton-atom";
import { useClient } from "@/hooks/useClient";
import MoreOptionsMolecule from "../molecules/more-options-molecule";

export default function TaskOrganism() {
  const [loading, setLoading] = useState(true);

  const tasks = useTaskStore(useShallow((state) => state.tasks));

  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const isClient = useClient();

  useEffect(() => {
    fetchTasks();
    setLoading(false);
  }, [fetchTasks]);

  if (!isClient) {
    return null;
  } else if (loading) {
    return <LoadingSkeleton />;
  }


  console.log("tasks", tasks);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ul className="gap-4 flex flex-col">
        {tasks?.map((task) => (
          <li
            key={task?.id}
            className={`p-4 flex justify-between items-center	 ${
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
    </Suspense>
  );
}
