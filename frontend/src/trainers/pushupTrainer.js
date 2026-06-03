import { calculateAngle } from "../utils/poseMath";

export function analyzePushup(landmarks, currentStage) {
  // MediaPipe returns an array containing 33 body points in a fixed order
  const leftShoulder = landmarks[11];
  const leftElbow = landmarks[13];
  const leftWrist = landmarks[15];

  // Body landmarks
  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];

  if (
    leftShoulder.visibility < 0.7 ||
    leftElbow.visibility < 0.7 ||
    leftWrist.visibility < 0.7 ||
    leftHip.visibility < 0.7 ||
    leftKnee.visibility < 0.7
  ) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Move back and keep your full body visible.",
    };
  }

  const bodyAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

  if (bodyAngle < 150) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Keep your body straight like a plank.",
    };
  }

  const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

  console.log("Body:", Math.round(bodyAngle), "Elbow:", Math.round(elbowAngle));

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
