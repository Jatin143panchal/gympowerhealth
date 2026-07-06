import { Utensils, Droplets, Flame, Target } from "lucide-react";

const dietPlan = {
  goal: "Muscle Building",
  calories: 2800,
  protein: 180,
  carbs: 320,
  fats: 85,
  meals: [
    {
      time: "7:00 AM",
      name: "Breakfast",
      foods: [
        "4 whole eggs scrambled",
        "2 slices whole grain toast",
        "1 avocado",
        "1 cup orange juice",
      ],
      calories: 650,
    },
    {
      time: "10:00 AM",
      name: "Morning Snack",
      foods: [
        "1 scoop whey protein",
        "1 banana",
        "1 tbsp almond butter",
      ],
      calories: 350,
    },
    {
      time: "1:00 PM",
      name: "Lunch",
      foods: [
        "8 oz grilled chicken breast",
        "1.5 cups brown rice",
        "Mixed vegetables",
        "Olive oil dressing",
      ],
      calories: 700,
    },
    {
      time: "4:00 PM",
      name: "Pre-Workout",
      foods: [
        "1 cup Greek yogurt",
        "1/2 cup granola",
        "Mixed berries",
      ],
      calories: 400,
    },
    {
      time: "7:00 PM",
      name: "Post-Workout / Dinner",
      foods: [
        "8 oz salmon fillet",
        "Sweet potato",
        "Steamed broccoli",
        "1 tbsp olive oil",
      ],
      calories: 650,
    },
    {
      time: "9:00 PM",
      name: "Evening Snack",
      foods: [
        "1 cup cottage cheese",
        "Handful of almonds",
      ],
      calories: 250,
    },
  ],
};

export default function DietPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Diet Plan</h1>
        <p className="text-muted-foreground">Your personalized nutrition guide</p>
      </div>

      {/* Macros Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Flame className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-display text-2xl font-bold">{dietPlan.calories}</p>
          <p className="text-sm text-muted-foreground">Daily Calories</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Target className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-display text-2xl font-bold">{dietPlan.protein}g</p>
          <p className="text-sm text-muted-foreground">Protein</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Utensils className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-display text-2xl font-bold">{dietPlan.carbs}g</p>
          <p className="text-sm text-muted-foreground">Carbs</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="font-display text-2xl font-bold">{dietPlan.fats}g</p>
          <p className="text-sm text-muted-foreground">Fats</p>
        </div>
      </div>

      {/* Goal */}
      <div className="p-4 rounded-xl gym-gradient-bg text-primary-foreground">
        <p className="text-sm font-medium opacity-80">Current Goal</p>
        <p className="font-display text-xl font-bold">{dietPlan.goal}</p>
      </div>

      {/* Meal Plan */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold">Daily Meal Schedule</h2>
        {dietPlan.meals.map((meal) => (
          <div
            key={meal.name}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm text-primary font-medium">{meal.time}</span>
                <h3 className="font-semibold">{meal.name}</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {meal.calories} cal
              </span>
            </div>
            <ul className="space-y-1">
              {meal.foods.map((food, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {food}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Water Reminder */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Hydration Goal</h3>
            <p className="text-sm text-muted-foreground">
              Drink at least 3-4 liters of water daily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
