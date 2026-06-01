import { calculateAngle } from "../utils/poseMath";

export function analyzePushup(landmarks, currentStage) {
  // MediaPipe returns an array containing 33 body points in a fixed order
  const leftShoulder = landmarks[11];
  const leftElbow = landmarks[13];
  const leftWrist = landmarks[15];

  const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

  if (elbowAngle < 100) {
    return {
      stage: "down",
      repCompleted: false,
      feedback: "Good depth. Push back up.",
    };
  }

  if (elbowAngle > 160 && currentStage === "down") {
    return {
      stage: "up",
      repCompleted: true,
      feedback: "Great rep. Keep going",
    };
  }

  return {
    stage: currentStage,
    repCompleted: false,
    feedback: "Keep your body steady and control the movement",
  };
}
