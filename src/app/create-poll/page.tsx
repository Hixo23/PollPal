import { CreatePollForm } from "@/components/createpollform/CreatePollForm";

const CreatePollPage = () => {
  return (
    <main className="flex h-full min-h-[80vh] w-full min-w-[95vw] items-center justify-center bg-neutral-900">
      <CreatePollForm />
    </main>
  );
};

export default CreatePollPage;
