import { calculateAngle } from "../utils/poseMath";

export function analyzePlank(landmarks) {
  const leftShoulder = landmarks[11];
  const leftHip = landmarks[23];
  const leftAnkle = landmarks[27];

  // Visibility check
  if (
    leftShoulder.visibility < 0.7 ||
    leftHip.visibility < 0.7 ||
    leftAnkle.visibility < 0.7
  ) {
    return {
      isHolding: false,
      feedback: "Move back and keep your full body visible.",
    };
  }

  const bodyAngle = calculateAngle(
    leftShoulder,
    leftHip,
    leftAnkle
  );

  console.log("Plank Body Angle:", Math.round(bodyAngle));

  if (bodyAngle >= 150) {
    return {
      isHolding: true,
      feedback: "Good plank position. Keep holding.",
    };
  }

  return {
    isHolding: false,
    feedback: "Keep your body straight like a plank.",
  };
}