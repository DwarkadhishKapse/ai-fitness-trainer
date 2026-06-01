import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { createPoseLandmarker } from "../utils/createPoseLandmarker";
import { analyzePushup } from "../trainers/pushupTrainer";
import { analyzeSquat } from "../trainers/squatTrainer";
import { analyzePlank } from "../trainers/plankTrainer";
import {
  Camera,
  Dumbbell,
  Lock,
  ShieldCheck,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { workouts } from "../data/workouts";
import { useSearchParams } from "react-router-dom";

function findExerciseById(exerciseId) {
  for (const workout of workouts) {
    const exercise = workout.variations.find((item) => item.id === exerciseId);

    if (exercise) {
      return {
        workout,
        exercise,
      };
    }
  }
  return null;
}

const AITrainer = () => {
  const [searchParams] = useSearchParams();
  const selectedExerciseId = searchParams.get("workout");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const [modelStatus, setModelStatus] = useState("Loading AI model...");
  const webcamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSpokenFeedbackRef = useRef("");
  const lastSpokenAtRef = useRef(0);
  const [repCount, setRepCount] = useState(0);
  const stageRef = useRef("up");
  const lastDetectionTimeRef = useRef(0);
  const [holdSeconds, setHoldSeconds] = useState(0);
  const isHoldingPlankRef = useRef(false);

  const [feedback, setFeedback] = useState(
    "Start AI trainer to receive posture guidance and voice feedback.",
  );

  useEffect(() => {
    let isMounted = true;

    async function loadModel() {
      try {
        const landMarker = await createPoseLandmarker();
        if (isMounted) {
          setPoseLandmarker(landMarker);
          setModelStatus("AI model ready");
        }
      } catch (error) {
        if (isMounted) {
          setModelStatus("AI model failed to load");
        }
      }
    }
    loadModel();
    return () => {
      isMounted = false;
    };
  }, []);

  const speakFeedback = (message) => {
    const now = Date.now();

    if (!window.speechSynthesis) {
      return;
    }

    if (lastSpokenFeedbackRef.current === message) {
      return;
    }

    if (now - lastSpokenAtRef.current < 4000) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    lastSpokenFeedbackRef.current = message;
    lastSpokenAtRef.current = now;
  };

  useEffect(() => {
    if (!isCameraOn || !poseLandmarker) {
      return;
    }

    const detectPose = () => {
      const video = webcamRef.current?.video;

      const now = performance.now(); // gets the current time in milliseconds

      if (
        video &&
        video.readyState === 4 &&
        now - lastDetectionTimeRef.current >= 120 // runs detection approximately 120ms, around 8 times per second
      ) {
        lastDetectionTimeRef.current = now;
        const result = poseLandmarker.detectForVideo(video, now);

        if (result.landmarks?.length > 0) {
          // get the first detected person's body points
          const landmarks = result.landmarks[0];

          let analysis = null;

          // Run pushup logic only for pushup exercise
          if (
            selectedExerciseId === "knee-pushups" ||
            selectedExerciseId === "standard-pushups"
          ) {
            // Check elbow angle and decide whether the user is up or down.
            analysis = analyzePushup(landmarks, stageRef.current);
          }

          if (selectedExerciseId === "bodyweight-squats") {
            analysis = analyzeSquat(landmarks, stageRef.current);
          }

          if (selectedExerciseId === "forearm-plank") {
            analysis = analyzePlank(landmarks, stageRef.current);

            isHoldingPlankRef.current = plankAnalysis.isHolding;
            setFeedback(plankAnalysis.feedback);
          }

          if (analysis) {
            // Remember the newest position for the next camera frame.
            stageRef.current = analysis.stage;

            setFeedback(analysis.feedback);

            if (analysis.repCompleted) {
              setRepCount((currentCount) => currentCount + 1);
              speakFeedback(analysis.feedback);
            }
          } else if (selectedExerciseId !== "forearm-plank") {
            const message =
              "Pose detected. AI counting for this exercise is coming soon.";
            setFeedback(message);
          }
        } else {
          const message =
            "No pose detected. Step back and keep your body in frame.";
          setFeedback(message);
          speakFeedback(message);
        }
      }
      animationFrameRef.current = requestAnimationFrame(detectPose);
    };
    detectPose();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraOn, poseLandmarker, selectedExerciseId]);

  useEffect(() => {
    if (!isCameraOn && selectedExerciseId !== "forearm-plank") {
      return;
    }

    const timer = setInterval(() => {
      if (isHoldingPlankRef.current) {
        setHoldSeconds((currentSeconds) => currentSeconds + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCameraOn, selectedExerciseId]);

  useEffect(() => {
    if (!isCameraOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isCameraOn]);

  const selectedData = findExerciseById(selectedExerciseId);

  const handleReset = () => {
    setRepCount(0);
    setHoldSeconds(0);
    stage.current = "up";
    setFeedback("Rep count reset. Start when you are ready.");
    lastSpokenFeedbackRef.current = "";
    isHoldingPlankRef.current = false;
  };

  return (
    <section>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Posture Detection
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">AI Trainer</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Train with real-time posture guidance, rep counting, and voice
            feedback using your device camera.
          </p>
        </div>

        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 shrink-0 text-emerald-300"
              size={20}
            />
            <div>
              <p className="text-sm font-semibold text-emerald-200">
                Your privacy is protected
              </p>
              <p className="mt-1 max-w-md text-xs leading-5 text-emerald-100/80">
                Camera analysis runs only for posture guidance. We do not
                record, store, or upload your workout video.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
            <div className="absolute left-4 top-4 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Private session
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
              {isCameraOn ? "Camera On" : "Camera Off"}
            </div>

            {isCameraOn ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored
                className="h-full min-h-[460px] w-full object-cover"
                videoConstraints={{
                  facingMode: "user",
                }}
              />
            ) : (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Camera size={22} />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-white">
                  Ready when you are
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Start your camera only when you are comfortable. The trainer
                  will analyze pose landmarks for form feedback and rep
                  counting.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                    <Lock className="mx-auto text-cyan-300" size={20} />
                    <p className="mt-2 text-xs font-semibold text-slate-300">
                      No recording
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                    <ShieldCheck
                      className="mx-auto text-emerald-300"
                      size={20}
                    />
                    <p className="mt-2 text-xs font-semibold text-slate-300">
                      Local preview
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                    <Volume2 className="mx-auto text-cyan-300" size={20} />
                    <p className="mt-2 text-xs font-semibold text-slate-300">
                      Voice tips
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            <Dumbbell size={24} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-white">
            {selectedData ? selectedData.exercise.name : "No exercise selected"}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {selectedData
              ? `${selectedData.workout.name} | ${selectedData.exercise.difficulty}`
              : "Choose an exercise from the workout section to start AI training."}
          </p>

          <div className="mt-6 flex items-center justify-between rounded-lg bg-slate-950 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-300">
                {selectedExerciseId === "forearm-plank"
                  ? "Hold Time"
                  : "Rep Count"}
              </p>
              <p className="mt-2 text-4xl font-bold text-cyan-300">
                {selectedExerciseId === "forearm-plank"
                  ? `${holdSeconds}s`
                  : repCount}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
              title="Reset rep count"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="mt-4 rounded-lg bg-slate-950 p-4">
            <p className="text-sm font-semibold text-slate-300">Feedback</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{feedback}</p>
          </div>

          <button
            type="button"
            disabled={!poseLandmarker}
            onClick={() => setIsCameraOn((prev) => !prev)}
            className="mt-6 w-full rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCameraOn ? "Stop Camera" : "Start Camera"}
          </button>
        </aside>
      </div>
    </section>
  );
};

export default AITrainer;
