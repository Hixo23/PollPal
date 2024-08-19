import { PollResults } from "@/components/pollresults/PollResults";

const PollResultsPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <PollResults id={params.id} />
    </main>
  );
};

export default PollResultsPage;
