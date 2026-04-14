import { useEffect, useState } from "react";

const getPacificDateString = () => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
};

const defaultHabits = [
  { id: 1, emoji: "💧", title: "Brush Teeth" },
  { id: 2, emoji: "🏃", title: "Physical Therapy Exercises" },
  { id: 3, emoji: "📚", title: "Read Book" },
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedDate, setSelectedDate] = useState(getPacificDateString());

  const [habits] = useState(() => {
    const savedHabits = localStorage.getItem("humenah-habits");
    return savedHabits ? JSON.parse(savedHabits) : defaultHabits;
  });

  const [completionsByDate, setCompletionsByDate] = useState(() => {
    const savedCompletions = localStorage.getItem("humenah-completions");
    return savedCompletions ? JSON.parse(savedCompletions) : {};
  });

  useEffect(() => {
    localStorage.setItem("humenah-habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(
      "humenah-completions",
      JSON.stringify(completionsByDate)
    );
  }, [completionsByDate]);

  const toggleHabit = (habitId) => {
    setCompletionsByDate((prev) => {
      const currentDateData = prev[selectedDate] || {};

      return {
        ...prev,
        [selectedDate]: {
          ...currentDateData,
          [habitId]: !currentDateData[habitId],
        },
      };
    });
  };

  const completedCount = habits.filter(
    (habit) => completionsByDate[selectedDate]?.[habit.id]
  ).length;

  const renderHomePage = () => (
    <>
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700">Selected date</p>
            <p className="text-sm text-stone-500">
              Today defaults to Pacific time
            </p>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-stone-300 px-3 py-2 text-stone-700"
          />
        </div>

        <p className="mt-4 text-sm text-stone-600">
          Completed {completedCount} of {habits.length} habits
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {habits.map((habit) => {
          const isCompleted = !!completionsByDate[selectedDate]?.[habit.id];

          return (
            <div
              key={habit.id}
              className="grid grid-cols-[56px_1fr_56px] items-center rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="text-center text-2xl">{habit.emoji}</div>

              <div
                className={
                  isCompleted
                    ? "text-lg text-stone-400 line-through"
                    : "text-lg text-stone-800"
                }
              >
                {habit.title}
              </div>

              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleHabit(habit.id)}
                  className="h-5 w-5"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderCalendarPage = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];

    for (let i = 0; i < startDay; i++) {
      calendarCells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      calendarCells.push(dateString);
    }

    const completedHabitsForSelectedDate = habits.filter(
      (habit) => completionsByDate[selectedDate]?.[habit.id]
    );

    return (
      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-stone-800">
            Calendar
          </h2>

          <div className="mb-3 grid grid-cols-7 gap-2 text-center text-sm font-medium text-stone-500">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((dateString, index) => {
              if (!dateString) {
                return <div key={index} className="h-16 rounded-xl" />;
              }

              const dayNumber = Number(dateString.split("-")[2]);
              const isSelected = dateString === selectedDate;
              const completedForDay = habits.filter(
                (habit) => completionsByDate[dateString]?.[habit.id]
              ).length;

              return (
                <button
                  key={dateString}
                  onClick={() => setSelectedDate(dateString)}
                  className={
                    isSelected
                      ? "h-16 rounded-xl border border-stone-900 bg-stone-900 p-2 text-left text-white"
                      : "h-16 rounded-xl border border-stone-200 bg-stone-50 p-2 text-left text-stone-800 hover:bg-stone-100"
                  }
                >
                  <div className="text-sm font-semibold">{dayNumber}</div>
                  <div className="mt-1 text-xs">
                    {completedForDay} done
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="text-xl font-semibold text-stone-800">
            Progress for {selectedDate}
          </h3>

          <p className="mt-2 text-sm text-stone-500">
            {completedHabitsForSelectedDate.length} of {habits.length} habits completed
          </p>

          <div className="mt-4 space-y-3">
            {habits.map((habit) => {
              const isCompleted = !!completionsByDate[selectedDate]?.[habit.id];

              return (
                <div
                  key={habit.id}
                  className="grid grid-cols-[56px_1fr_80px] items-center rounded-2xl border border-stone-200 bg-stone-50 p-4"
                >
                  <div className="text-center text-2xl">{habit.emoji}</div>

                  <div
                    className={
                      isCompleted
                        ? "text-stone-400 line-through"
                        : "text-stone-800"
                    }
                  >
                    {habit.title}
                  </div>

                  <div className="text-right text-sm font-medium">
                    {isCompleted ? "Done" : "Not done"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
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

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setCurrentPage("home")}
            className={
              currentPage === "home"
                ? "rounded-full bg-stone-900 px-4 py-2 text-white"
                : "rounded-full bg-white px-4 py-2 text-stone-700 border border-stone-200"
            }
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage("calendar")}
            className={
              currentPage === "calendar"
                ? "rounded-full bg-stone-900 px-4 py-2 text-white"
                : "rounded-full bg-white px-4 py-2 text-stone-700 border border-stone-200"
            }
          >
            Calendar
          </button>
        </div>

        {currentPage === "home" ? renderHomePage() : renderCalendarPage()}
      </div>
    </div>
  );
}

export default App;