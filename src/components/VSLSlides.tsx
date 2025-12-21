import { useState, useEffect, useRef, useCallback } from 'react';

// Block 1 - Pain/Frustration (12 scenes)
import b1MirrorFrustration from '@/assets/vsl/b1-mirror-frustration.jpg';
import b1FaceCloseup from '@/assets/vsl/b1-face-closeup.jpg';
import b1HandsGrip from '@/assets/vsl/b1-hands-grip.jpg';
import b1ExhaustedBench from '@/assets/vsl/b1-exhausted-bench.jpg';
import b1LostStare from '@/assets/vsl/b1-lost-stare.jpg';
import b1SweatCloseup from '@/assets/vsl/b1-sweat-closeup.jpg';
import b1EmptyGym from '@/assets/vsl/b1-empty-gym.jpg';
import b1BodyCompare from '@/assets/vsl/b1-body-compare.jpg';
import b1DoubtEyes from '@/assets/vsl/b1-doubt-eyes.jpg';
import b1HeavyWeight from '@/assets/vsl/b1-heavy-weight.jpg';
import b1WallLean from '@/assets/vsl/b1-wall-lean.jpg';
import b1ClenchedFist from '@/assets/vsl/b1-clenched-fist.jpg';

// Block 2 - Conflict/Confusion (10 scenes)
import b2AutopilotTraining from '@/assets/vsl/b2-autopilot-training.jpg';
import b2GymChaos from '@/assets/vsl/b2-gym-chaos.jpg';
import b2NotebookBlur from '@/assets/vsl/b2-notebook-blur.jpg';
import b2SwitchingExercises from '@/assets/vsl/b2-switching-exercises.jpg';
import b2ConfusedLook from '@/assets/vsl/b2-confused-look.jpg';
import b2ChaoticGym from '@/assets/vsl/b2-chaotic-gym.jpg';
import b2PoorForm from '@/assets/vsl/b2-poor-form.jpg';
import b2Hesitation from '@/assets/vsl/b2-hesitation.jpg';
import b2TreadmillNowhere from '@/assets/vsl/b2-treadmill-nowhere.jpg';
import b2MentalFatigue from '@/assets/vsl/b2-mental-fatigue.jpg';

// Block 3 - Turning Point/Awareness (8 scenes)
import b3LightShift from '@/assets/vsl/b3-light-shift.jpg';
import b3DeepBreath from '@/assets/vsl/b3-deep-breath.jpg';
import b3FocusedEyes from '@/assets/vsl/b3-focused-eyes.jpg';
import b3ConfidentPosture from '@/assets/vsl/b3-confident-posture.jpg';
import b3MuscleActivation from '@/assets/vsl/b3-muscle-activation.jpg';
import b3ClarityMoment from '@/assets/vsl/b3-clarity-moment.jpg';
import b3PurposefulGrip from '@/assets/vsl/b3-purposeful-grip.jpg';
import b3WalkingPurpose from '@/assets/vsl/b3-walking-purpose.jpg';

// Block 4 - Control/Method (8 scenes)
import b4PerfectCurl from '@/assets/vsl/b4-perfect-curl.jpg';
import b4BackDefinition from '@/assets/vsl/b4-back-definition.jpg';
import b4BenchControl from '@/assets/vsl/b4-bench-control.jpg';
import b4ChestContraction from '@/assets/vsl/b4-chest-contraction.jpg';
import b4SquatForm from '@/assets/vsl/b4-squat-form.jpg';
import b4ForearmDetail from '@/assets/vsl/b4-forearm-detail.jpg';
import b4ShoulderPress from '@/assets/vsl/b4-shoulder-press.jpg';
import b4TricepControl from '@/assets/vsl/b4-tricep-control.jpg';

// Block 5 - Result/Confidence (6 scenes)
import b5ConfidentStand from '@/assets/vsl/b5-confident-stand.jpg';
import b5ConfidentFace from '@/assets/vsl/b5-confident-face.jpg';
import b5MirrorResult from '@/assets/vsl/b5-mirror-result.jpg';
import b5ConfidentWalk from '@/assets/vsl/b5-confident-walk.jpg';
import b5DefinedMuscles from '@/assets/vsl/b5-defined-muscles.jpg';
import b5WorkoutComplete from '@/assets/vsl/b5-workout-complete.jpg';

// Block 6 - Final Decision/CTA (5 scenes)
import b6DecisionSilhouette from '@/assets/vsl/b6-decision-silhouette.jpg';
import b6SpotlightWeights from '@/assets/vsl/b6-spotlight-weights.jpg';
import b6EyesDecision from '@/assets/vsl/b6-eyes-decision.jpg';
import b6ReachingBar from '@/assets/vsl/b6-reaching-bar.jpg';
import b6FinalStance from '@/assets/vsl/b6-final-stance.jpg';

interface VSLSlidesProps {
  currentTime: number;
  captionLeadSeconds?: number;
  captionFadeMs?: number;
}

const SCENE_DURATION = 4;

const scenes = [
  // Block 1 - 12 scenes
  { image: b1MirrorFrustration, block: 1 },
  { image: b1FaceCloseup, block: 1 },
  { image: b1HandsGrip, block: 1 },
  { image: b1ExhaustedBench, block: 1 },
  { image: b1LostStare, block: 1 },
  { image: b1SweatCloseup, block: 1 },
  { image: b1EmptyGym, block: 1 },
  { image: b1BodyCompare, block: 1 },
  { image: b1DoubtEyes, block: 1 },
  { image: b1HeavyWeight, block: 1 },
  { image: b1WallLean, block: 1 },
  { image: b1ClenchedFist, block: 1 },
  // Block 2 - 10 scenes
  { image: b2AutopilotTraining, block: 2 },
  { image: b2GymChaos, block: 2 },
  { image: b2NotebookBlur, block: 2 },
  { image: b2SwitchingExercises, block: 2 },
  { image: b2ConfusedLook, block: 2 },
  { image: b2ChaoticGym, block: 2 },
  { image: b2PoorForm, block: 2 },
  { image: b2Hesitation, block: 2 },
  { image: b2TreadmillNowhere, block: 2 },
  { image: b2MentalFatigue, block: 2 },
  // Block 3 - 8 scenes
  { image: b3LightShift, block: 3 },
  { image: b3DeepBreath, block: 3 },
  { image: b3FocusedEyes, block: 3 },
  { image: b3ConfidentPosture, block: 3 },
  { image: b3MuscleActivation, block: 3 },
  { image: b3ClarityMoment, block: 3 },
  { image: b3PurposefulGrip, block: 3 },
  { image: b3WalkingPurpose, block: 3 },
  // Block 4 - 8 scenes
  { image: b4PerfectCurl, block: 4 },
  { image: b4BackDefinition, block: 4 },
  { image: b4BenchControl, block: 4 },
  { image: b4ChestContraction, block: 4 },
  { image: b4SquatForm, block: 4 },
  { image: b4ForearmDetail, block: 4 },
  { image: b4ShoulderPress, block: 4 },
  { image: b4TricepControl, block: 4 },
  // Block 5 - 6 scenes
  { image: b5ConfidentStand, block: 5 },
  { image: b5ConfidentFace, block: 5 },
  { image: b5MirrorResult, block: 5 },
  { image: b5ConfidentWalk, block: 5 },
  { image: b5DefinedMuscles, block: 5 },
  { image: b5WorkoutComplete, block: 5 },
  // Block 6 - 5 scenes
  { image: b6DecisionSilhouette, block: 6 },
  { image: b6SpotlightWeights, block: 6 },
  { image: b6EyesDecision, block: 6 },
  { image: b6ReachingBar, block: 6 },
  { image: b6FinalStance, block: 6 },
];

const VSLSlides = ({ currentTime }: VSLSlidesProps) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [nextSceneIndex, setNextSceneIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIndexRef = useRef(0);

  const getSceneIndexFromTime = useCallback((time: number) => {
    const index = Math.floor(time / SCENE_DURATION);
    return Math.min(index, scenes.length - 1);
  }, []);

  useEffect(() => {
    const targetIndex = getSceneIndexFromTime(currentTime);
    
    if (targetIndex !== prevIndexRef.current) {
      setNextSceneIndex(targetIndex);
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentSceneIndex(targetIndex);
        prevIndexRef.current = targetIndex;
        setIsTransitioning(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentTime, getSceneIndexFromTime]);

  const currentScene = scenes[currentSceneIndex];
  const nextScene = scenes[nextSceneIndex];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current Scene */}
      <div
        className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ animation: 'kenBurns 8s ease-in-out infinite alternate' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentScene.image})`,
            filter: 'brightness(0.55) saturate(0.9) contrast(1.1)',
          }}
        />
      </div>

      {/* Next Scene (crossfade) */}
      <div
        className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${nextScene.image})`,
            filter: 'brightness(0.55) saturate(0.9) contrast(1.1)',
          }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,0.85)_100%)]" />
      
      {/* Letterbox */}
      <div className="absolute top-0 left-0 right-0 h-[4%] bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-[4%] bg-black" />

      {/* Film grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1.5%, -1%); }
        }
      `}</style>
    </div>
  );
};

export default VSLSlides;
