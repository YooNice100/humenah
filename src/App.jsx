import { useState } from "react";

function App() {
  const [habits, setHabits] = useState([
    { id: 1, emoji: "💧", title: "Drink water", completed: false },
    { id: 2, emoji: "🏃", title: "Exercise", completed: false },
    { id: 3, emoji: "📚", title: "Read", completed: false },
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
    <div>
      <h1>HUMENAH</h1>
      <p>Your habit tracker</p>

      <div>
        {habits.map((habit) => (
          <div
            key={habit.id}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 60px",
              alignItems: "center",
              border: "1px solid lightgray",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div style={{ fontSize: "24px", textAlign: "center" }}>
              {habit.emoji}
            </div>

            <div
              style={{
                textDecoration: habit.completed ? "line-through" : "none",
              }}
            >
              {habit.title}
            </div>

            <div style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;