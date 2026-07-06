import { Dumbbell, Clock, Flame } from "lucide-react";

const workoutPlan = {
  name: "8-Week Muscle Building Program",
  week: 3,
  totalWeeks: 8,
  schedule: [
    {
      day: "Monday",
      title: "Chest & Triceps",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "60s" },
        { name: "Tricep Dips", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "45s" },
      ],
    },
    {
      day: "Tuesday",
      title: "Back & Biceps",
      exercises: [
        { name: "Deadlifts", sets: 4, reps: "6-8", rest: "120s" },
        { name: "Pull-ups", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Barbell Rows", sets: 3, reps: "8-10", rest: "90s" },
        { name: "Lat Pulldowns", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Barbell Curls", sets: 3, reps: "10-12", rest: "60s" },
      ],
    },
    {
      day: "Wednesday",
      title: "Rest Day",
      exercises: [],
    },
    {
      day: "Thursday",
      title: "Legs & Core",
      exercises: [
        { name: "Squats", sets: 4, reps: "8-10", rest: "120s" },
        { name: "Leg Press", sets: 4, reps: "10-12", rest: "90s" },
        { name: "Romanian Deadlifts", sets: 3, reps: "10-12", rest: "90s" },
        { name: "Leg Curls", sets: 3, reps: "12-15", rest: "60s" },
        { name: "Planks", sets: 3, reps: "60s", rest: "45s" },
      ],
    },
    {
      day: "Friday",
      title: "Shoulders & Arms",
      exercises: [
        { name: "Overhead Press", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "45s" },
        { name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s" },
        { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Skull Crushers", sets: 3, reps: "10-12", rest: "60s" },
      ],
    },
  ],
};

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Workout Plans</h1>
        <p className="text-muted-foreground">Your personalized training program</p>
      </div>

      {/* Current Plan */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-bold">{workoutPlan.name}</h2>
            <p className="text-muted-foreground">
              Week {workoutPlan.week} of {workoutPlan.totalWeeks}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full gym-gradient-bg flex items-center justify-center">
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="gym-gradient-bg h-2 rounded-full"
            style={{ width: `${(workoutPlan.week / workoutPlan.totalWeeks) * 100}%` }}
          />
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {workoutPlan.schedule.map((day) => (
          <div
            key={day.day}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold">{day.day}</h3>
                <p className={day.exercises.length === 0 ? "text-muted-foreground" : "text-primary"}>
                  {day.title}
                </p>
              </div>
              {day.exercises.length > 0 && (
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    {day.exercises.length} exercises
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ~60 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    ~400 cal
                  </span>
                </div>
              )}
            </div>
            {day.exercises.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-2">Exercise</th>
                      <th className="pb-2">Sets</th>
                      <th className="pb-2">Reps</th>
                      <th className="pb-2">Rest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((exercise, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="py-3 font-medium">{exercise.name}</td>
                        <td className="py-3">{exercise.sets}</td>
                        <td className="py-3">{exercise.reps}</td>
                        <td className="py-3 text-muted-foreground">{exercise.rest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
