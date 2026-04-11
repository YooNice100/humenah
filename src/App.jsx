import { useState } from "react";

function App() {
  const [habits, setHabits] = useState([
    { id: 1, emoji: "💧", title: "Brush Teeth", completed: false },
    { id: 2, emoji: "🏃", title: "Physical Therapy Exercises", completed: false },
    { id: 3, emoji: "📚", title: "Read Book", completed: false },
  ]);

  const toggleHabit = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id
        ? { ...habit, completed: !habit.completed }
        : habit
    );

    setHabits(updatedHabits);
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-5xl font-bold tracking-tight text-stone-900">
          HUMENAH
        </h1>
        <p className="mt-3 text-center text-lg text-stone-600">
          Your habit tracker
        </p>

        <div className="mt-8 space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="grid grid-cols-[56px_1fr_56px] items-center rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="text-center text-2xl">{habit.emoji}</div>

              <div
                className={
                  habit.completed
                    ? "text-lg text-stone-400 line-through"
                    : "text-lg text-stone-800"
                }
              >
                {habit.title}
              </div>

              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                  className="h-5 w-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;