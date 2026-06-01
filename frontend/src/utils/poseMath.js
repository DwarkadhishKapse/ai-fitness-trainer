export function calculateAngle(pointA, pointB, pointC) {
  // calculate elbow to shoulder and elbow to wrist
  const radians =
    Math.atan2(pointC.y - pointB.y, pointC.x - pointB.y) -
    Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);

  let angle = Math.abs((radians * 180) / Math.PI); // abs: removes negative sign from a number. PI: converts radians into PI value (human understandable). 3.1444444 to 3.14

  if (angle > 180) {
    angle = 360 - angle;
  }

  // returns the angle at B
  return angle;
}
