import { PollVote } from "@/components/poll/Poll";
const PollPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-[80vh] min-w-full items-center justify-center">
      <PollVote isMock={false} voteButtonDisabled={false} id={params.id} />
    </main>
  );
};

export default PollPage;
