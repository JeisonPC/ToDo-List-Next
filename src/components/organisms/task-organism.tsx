"use client";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { InformationMolecule } from "../molecules/information-molecule";

export default function TaskOrganism() {
  const tasks = useTaskStore(useShallow((state) => state.tasks));
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      {tasks.map((task) => (
        <ul key={task.id}>
          <li className="p-4">
            <div>
              <p>icon</p>
            </div>
            <div>
              <InformationMolecule
                title={task.title}
                description={task.description}
              />
              <h3></h3>
              <p></p>
            </div>
            <div>icon</div>
          </li>
        </ul>
      ))}
    </div>
  );
}
