import { calculateAngle } from "../utils/poseMath";

export function analyzeSquat(landmarks, currentStage) {
  const leftShoulder = landmarks[11];

  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];

  // Visibility check
  if (
    leftShoulder.visibility < 0.7 ||
    leftHip.visibility < 0.7 ||
    leftKnee.visibility < 0.7 ||
    leftAnkle.visibility < 0.7
  ) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Move back and keep your full body visible.",
    };
  }

  // Body posture check
  const bodyAngle = calculateAngle(
    leftShoulder,
    leftHip,
    leftKnee
  );

  if (bodyAngle < 140) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Stand upright before starting the squat.",
    };
  }

  const kneeAngle = calculateAngle(
    leftHip,
    leftKnee,
    leftAnkle
  );

  console.log(
    "Body:",
    Math.round(bodyAngle),
    "Knee:",
    Math.round(kneeAngle)
  );

  if (kneeAngle < 110) {
    return {
      stage: "down",
      repCompleted: false,
      feedback: "Good depth. Stand back up.",
    };
  }

  if (kneeAngle > 160 && currentStage === "down") {
    return {
      stage: "up",
      repCompleted: true,
      feedback: "Great squat. Keep going.",
    };
  }

  return {
    stage: currentStage,
    repCompleted: false,
    feedback: "Keep your chest up and control the movement.",
  };
}