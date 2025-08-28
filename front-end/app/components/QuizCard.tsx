export default function QuizCard({ title, duration }: { title: string; duration: number }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Duration: {duration} mins</p>
    </div>
  );
}
