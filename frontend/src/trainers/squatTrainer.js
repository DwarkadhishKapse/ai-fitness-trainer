import { calculateAngle } from "../utils/poseMath";

export function analyzeSquat(landmarks, currentStage) {
  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];

  const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

  if (kneeAngle < 110) {
    return {
      stage: "down",
      repCompleted: false,
      feedback: "Good depth. Stand back up",
    };
  }

  if (kneeAngle > 160 && currentStage === "down") {
    return {
      stage: "up",
      repCompleted: true,
      feedback: "Great Squat. Keep going",
    };
  }

  return {
    stage: "down",
    repCompleted: false,
    feedback: "Keep your chest up and control the movement",
  };
}
