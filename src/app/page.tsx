import TaskOrganism from "@/components/organisms/task-organism";
export default function Home() {

  return (
    <div>
      <h1 className="text-3xl	font-bold">¡Hola de nuevo!</h1>
      <section>
        <h2>Mis tareas</h2>
        <TaskOrganism />
      </section>
    </div>
  );
}
