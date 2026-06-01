import { calculateAngle } from "../utils/poseMath";

export function analyzePlank(landmarks, currentStage) {
  const leftShoulder = landmarks[11];
  const leftHip = landmarks[23];
  const leftAnkle = landmarks[27];

  const bodyAngle = calculateAngle(leftShoulder, leftHip, leftAnkle);

  if (bodyAngle >= 160) {
    return {
      isHolding: true,
      feedback: "Good plank position. Keep holding.",
    };
  }

  return {
    isHolding: false,
    feedback: "Adjust your posture. Keep your body in a straight line",
  };
}
