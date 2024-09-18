import SlideFormOrganism from "@/components/organisms/slide-create-task-organism";
import TaskOrganism from "@/components/organisms/task-organism";
import { FaHandPeace } from "react-icons/fa";

export default function Home() {


  return (
    <>
      <div className="flex gap-2">
        <h1 className="text-3xl	font-bold pb-8">¡Hola de nuevo!</h1>
        <FaHandPeace className="text-3xl" />
      </div>
      <section>
        <h2 className="pb-6 text-2xl">Mis tareas</h2>
        <TaskOrganism />
      </section>

      <section>
        <SlideFormOrganism />
      </section>
    </>
  );
}
