import dynamic from "next/dynamic";

const TaskOrganism = dynamic(
  () => import("@/components/organisms/task-organism"),
  {
    loading: () => <p>Loading tasks...</p>,
  }
);

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl	font-bold">¡Hola de nuevo!</h1>
      <section>
        <h2>Mis tareas</h2>
        <ul>
          <li>
            <TaskOrganism />
          </li>
        </ul>
      </section>
    </div>
  );
}
