import { calculateAngle } from "../utils/poseMath";

export function analyzeLunge(landmarks, currentStage) {
  const leftShoulder = landmarks[11];

  const leftHip = landmarks[23];
  const leftKnee = landmarks[25];
  const leftAnkle = landmarks[27];

  const rightHip = landmarks[24];
  const rightKnee = landmarks[26];
  const rightAnkle = landmarks[28];

  if (
    leftShoulder.visibility < 0.7 ||
    leftHip.visibility < 0.7 ||
    leftKnee.visibility < 0.7 ||
    leftAnkle.visibility < 0.7 ||
    rightHip.visibility < 0.7 ||
    rightKnee.visibility < 0.7 ||
    rightAnkle.visibility < 0.7
  ) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Move back and keep your full body visible.",
    };
  }

  const bodyAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

  if (bodyAngle < 140) {
    return {
      stage: currentStage,
      repCompleted: false,
      feedback: "Stand upright before starting the lunge.",
    };
  }

  const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

  const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

  const kneeAngle = Math.min(leftKneeAngle, rightKneeAngle);

  if (kneeAngle < 110) {
    return {
      stage: "down",
      repCompleted: false,
      feedback: "Good depth. Push back up.",
    };
  }

  if (kneeAngle > 160 && currentStage === "down") {
    return {
      stage: "up",
      repCompleted: true,
      feedback: "Great lunge. keep going.",
    };
  }

  return {
    stage: currentStage,
    repCompleted: false,
    feedback: "Keep your chest up and maintain balance.",
  };
}
