import { useState, useEffect } from "react";

const getTodayDate = () => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}



function App() {


  const [habits, setHabits] = useState([
    { id: 1, title: "Read"},
    { id: 2, title: "Physical Therapy Exercises"},
    { id: 3, title: "Brush Teeth"},
    { id: 4, title: "Run"}
  ]);



    // 1. state
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  // completionsByDate is the data, setCompletionsByDate is the function that is updating the data
  const [completionsByDate, setCompletionsByDate] = useState(() => {
    const saved = localStorage.getItem("humenah-completions");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "humenah-completions",
      JSON.stringify(completionsByDate)
    );
  }, [completionsByDate]);

  const toggleHabit = (id) => {
    setCompletionsByDate((previousCompletions) => {
      const currentDateCompletions = previousCompletions[selectedDate] || {};

      return {
        ...previousCompletions,
        [selectedDate]: {
          ...currentDateCompletions,
          [id]: !currentDateCompletions[id],
        },
      };
    });
  };
  




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100">

      <div className = 'mb-4 text-center'>
        <h1>HUMENAH</h1>
        <h2>Daily Focus</h2>

      </div>

      <div className="text-center">
        <p>Your habit tracker</p>
        <p>I want to build new systems.</p>
      </div>


      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
       className="mt-4 rounded-lg border border-stone-300 px-3 py-2"
      />


  <div className = "text-center mt-6 space-y-3">
    {habits.map((habit) => {
    const isCompleted = !!completionsByDate[selectedDate]?.[habit.id];

    return (
      <div
        key={habit.id}
        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
      >
        <span
          className={`flex-1 ${isCompleted ? "line-through text-gray-400" : ""}`}
        >
          {habit.title}
        </span>

        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleHabit(habit.id)}
          className="ml-4"
        />
      </div>
    );
  })}
</div>

      

</div>
  );
}
export default App;