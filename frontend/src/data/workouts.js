export const workouts = [
  {
    id: "pushups",
    name: "Push Ups",
    category: "Chest",
    level: "beginner",
    description:
      "A bodyweight exercise that strengthens chest, shoulders, triceps, and core.",
    image:
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=80",
    variations: [
      {
        id: "knee-pushups",
        name: "Knee Push Ups",
        difficulty: "Beginner",
        targetMuscles: ["Chest", "Shoulders", "Triceps"],
        steps: [
          "Place your knees on the floor and hands slightly wider than shoulders.",
          "Keep your body straight from head to knees.",
          "Lower your chest slowly toward the floor.",
          "Push back up until your arms are straight.",
        ],
        tips: [
          "Do not drop your hips.",
          "Keep your core tight.",
          "Move slowly and control each rep.",
        ],
      },
      {
        id: "standard-pushups",
        name: "Standard Push Ups",
        difficulty: "Beginner",
        targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
        steps: [
          "Start in a high plank position.",
          "Place hands slightly wider than shoulder width.",
          "Lower your chest until it is close to the floor.",
          "Push back up while keeping your body straight.",
        ],
        tips: [
          "Do not flare elbows too much.",
          "Keep neck neutral.",
          "Avoid sagging hips.",
        ],
      },
    ],
  },
  {
    id: "squats",
    name: "Squats",
    category: "Legs",
    level: "beginner",
    description:
      "A lower-body exercise that trains quads, glutes, hamstrings, and core stability.",
    image:
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=900&q=80",
    variations: [
      {
        id: "bodyweight-squats",
        name: "Bodyweight Squats",
        difficulty: "Beginner",
        targetMuscles: ["Quads", "Glutes", "Hamstrings"],
        steps: [
          "Stand with feet shoulder-width apart.",
          "Keep your chest up and core tight.",
          "Push hips back and bend your knees.",
          "Go down until thighs are almost parallel to the floor.",
          "Stand back up by pushing through your heels.",
        ],
        tips: [
          "Keep knees in line with toes.",
          "Do not round your back.",
          "Do not lift heels off the floor.",
        ],
      },
    ],
  },
  {
    id: "plank",
    name: "Plank",
    category: "Core",
    level: "beginner",
    description:
      "A core stability exercise that improves posture, balance, and abdominal strength.",
    image:
      "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=80",
    variations: [
      {
        id: "forearm-plank",
        name: "Forearm Plank",
        difficulty: "Beginner",
        targetMuscles: ["Core", "Shoulders", "Lower Back"],
        steps: [
          "Place forearms on the floor.",
          "Keep elbows under shoulders.",
          "Extend legs back and keep body straight.",
          "Hold the position while breathing normally.",
        ],
        tips: [
          "Do not lift hips too high.",
          "Do not let lower back sink.",
          "Look slightly ahead, not straight down.",
        ],
      },
    ],
  },
];
