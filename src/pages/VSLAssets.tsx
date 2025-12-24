import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Block 1 - Pain/Frustration
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

// Block 2 - Conflict/Confusion
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

// Block 3 - Turning Point
import b3LightShift from '@/assets/vsl/b3-light-shift.jpg';
import b3DeepBreath from '@/assets/vsl/b3-deep-breath.jpg';
import b3FocusedEyes from '@/assets/vsl/b3-focused-eyes.jpg';
import b3ConfidentPosture from '@/assets/vsl/b3-confident-posture.jpg';
import b3MuscleActivation from '@/assets/vsl/b3-muscle-activation.jpg';
import b3ClarityMoment from '@/assets/vsl/b3-clarity-moment.jpg';
import b3PurposefulGrip from '@/assets/vsl/b3-purposeful-grip.jpg';
import b3WalkingPurpose from '@/assets/vsl/b3-walking-purpose.jpg';

// Block 4 - Control/Method
import b4PerfectCurl from '@/assets/vsl/b4-perfect-curl.jpg';
import b4BackDefinition from '@/assets/vsl/b4-back-definition.jpg';
import b4BenchControl from '@/assets/vsl/b4-bench-control.jpg';
import b4ChestContraction from '@/assets/vsl/b4-chest-contraction.jpg';
import b4SquatForm from '@/assets/vsl/b4-squat-form.jpg';
import b4ForearmDetail from '@/assets/vsl/b4-forearm-detail.jpg';
import b4ShoulderPress from '@/assets/vsl/b4-shoulder-press.jpg';
import b4TricepControl from '@/assets/vsl/b4-tricep-control.jpg';

// Block 5 - Result/Confidence
import b5ConfidentStand from '@/assets/vsl/b5-confident-stand.jpg';
import b5ConfidentFace from '@/assets/vsl/b5-confident-face.jpg';
import b5MirrorResult from '@/assets/vsl/b5-mirror-result.jpg';
import b5ConfidentWalk from '@/assets/vsl/b5-confident-walk.jpg';
import b5DefinedMuscles from '@/assets/vsl/b5-defined-muscles.jpg';
import b5WorkoutComplete from '@/assets/vsl/b5-workout-complete.jpg';

// Block 6 - Final Decision/CTA
import b6DecisionSilhouette from '@/assets/vsl/b6-decision-silhouette.jpg';
import b6SpotlightWeights from '@/assets/vsl/b6-spotlight-weights.jpg';
import b6EyesDecision from '@/assets/vsl/b6-eyes-decision.jpg';
import b6ReachingBar from '@/assets/vsl/b6-reaching-bar.jpg';
import b6FinalStance from '@/assets/vsl/b6-final-stance.jpg';
import b6EpicSilhouette from '@/assets/vsl/b6-epic-silhouette.jpg';
import b6DecisionEyes from '@/assets/vsl/b6-decision-eyes.jpg';
import b6VictoryMoment from '@/assets/vsl/b6-victory-moment.jpg';
import b6TransformationWalk from '@/assets/vsl/b6-transformation-walk.jpg';
import b6ReachingDestiny from '@/assets/vsl/b6-reaching-destiny.jpg';

interface ImageBlock {
  title: string;
  color: string;
  images: { src: string; name: string }[];
}

const blocks: ImageBlock[] = [
  {
    title: "Bloco 1 - Dor / Frustração",
    color: "from-red-600/20 to-red-900/20",
    images: [
      { src: b1MirrorFrustration, name: "b1-mirror-frustration" },
      { src: b1FaceCloseup, name: "b1-face-closeup" },
      { src: b1HandsGrip, name: "b1-hands-grip" },
      { src: b1ExhaustedBench, name: "b1-exhausted-bench" },
      { src: b1LostStare, name: "b1-lost-stare" },
      { src: b1SweatCloseup, name: "b1-sweat-closeup" },
      { src: b1EmptyGym, name: "b1-empty-gym" },
      { src: b1BodyCompare, name: "b1-body-compare" },
      { src: b1DoubtEyes, name: "b1-doubt-eyes" },
      { src: b1HeavyWeight, name: "b1-heavy-weight" },
      { src: b1WallLean, name: "b1-wall-lean" },
      { src: b1ClenchedFist, name: "b1-clenched-fist" },
    ],
  },
  {
    title: "Bloco 2 - Conflito / Confusão",
    color: "from-orange-600/20 to-orange-900/20",
    images: [
      { src: b2AutopilotTraining, name: "b2-autopilot-training" },
      { src: b2GymChaos, name: "b2-gym-chaos" },
      { src: b2NotebookBlur, name: "b2-notebook-blur" },
      { src: b2SwitchingExercises, name: "b2-switching-exercises" },
      { src: b2ConfusedLook, name: "b2-confused-look" },
      { src: b2ChaoticGym, name: "b2-chaotic-gym" },
      { src: b2PoorForm, name: "b2-poor-form" },
      { src: b2Hesitation, name: "b2-hesitation" },
      { src: b2TreadmillNowhere, name: "b2-treadmill-nowhere" },
      { src: b2MentalFatigue, name: "b2-mental-fatigue" },
    ],
  },
  {
    title: "Bloco 3 - Virada / Consciência",
    color: "from-yellow-600/20 to-yellow-900/20",
    images: [
      { src: b3LightShift, name: "b3-light-shift" },
      { src: b3DeepBreath, name: "b3-deep-breath" },
      { src: b3FocusedEyes, name: "b3-focused-eyes" },
      { src: b3ConfidentPosture, name: "b3-confident-posture" },
      { src: b3MuscleActivation, name: "b3-muscle-activation" },
      { src: b3ClarityMoment, name: "b3-clarity-moment" },
      { src: b3PurposefulGrip, name: "b3-purposeful-grip" },
      { src: b3WalkingPurpose, name: "b3-walking-purpose" },
    ],
  },
  {
    title: "Bloco 4 - Controle / Método",
    color: "from-green-600/20 to-green-900/20",
    images: [
      { src: b4PerfectCurl, name: "b4-perfect-curl" },
      { src: b4BackDefinition, name: "b4-back-definition" },
      { src: b4BenchControl, name: "b4-bench-control" },
      { src: b4ChestContraction, name: "b4-chest-contraction" },
      { src: b4SquatForm, name: "b4-squat-form" },
      { src: b4ForearmDetail, name: "b4-forearm-detail" },
      { src: b4ShoulderPress, name: "b4-shoulder-press" },
      { src: b4TricepControl, name: "b4-tricep-control" },
    ],
  },
  {
    title: "Bloco 5 - Resultado / Confiança",
    color: "from-blue-600/20 to-blue-900/20",
    images: [
      { src: b5ConfidentStand, name: "b5-confident-stand" },
      { src: b5ConfidentFace, name: "b5-confident-face" },
      { src: b5MirrorResult, name: "b5-mirror-result" },
      { src: b5ConfidentWalk, name: "b5-confident-walk" },
      { src: b5DefinedMuscles, name: "b5-defined-muscles" },
      { src: b5WorkoutComplete, name: "b5-workout-complete" },
    ],
  },
  {
    title: "Bloco 6 - Decisão Final / CTA",
    color: "from-purple-600/20 to-purple-900/20",
    images: [
      { src: b6DecisionSilhouette, name: "b6-decision-silhouette" },
      { src: b6SpotlightWeights, name: "b6-spotlight-weights" },
      { src: b6EyesDecision, name: "b6-eyes-decision" },
      { src: b6ReachingBar, name: "b6-reaching-bar" },
      { src: b6FinalStance, name: "b6-final-stance" },
      { src: b6EpicSilhouette, name: "b6-epic-silhouette" },
      { src: b6DecisionEyes, name: "b6-decision-eyes" },
      { src: b6VictoryMoment, name: "b6-victory-moment" },
      { src: b6TransformationWalk, name: "b6-transformation-walk" },
      { src: b6ReachingDestiny, name: "b6-reaching-destiny" },
    ],
  },
];

const VSLAssets = () => {
  const handleDownload = async (src: string, name: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleDownloadAll = async () => {
    for (const block of blocks) {
      for (const image of block.images) {
        await handleDownload(image.src, image.name);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Assets da VSL</h1>
          <p className="text-muted-foreground mb-6">
            Clique em qualquer imagem para baixar. Total: {blocks.reduce((acc, b) => acc + b.images.length, 0)} imagens.
          </p>
          <Button onClick={handleDownloadAll} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Baixar Todas ({blocks.reduce((acc, b) => acc + b.images.length, 0)} imagens)
          </Button>
        </header>

        {blocks.map((block, blockIndex) => (
          <section key={blockIndex} className="mb-12">
            <div className={`bg-gradient-to-r ${block.color} rounded-lg p-6`}>
              <h2 className="text-2xl font-semibold mb-2">{block.title}</h2>
              <p className="text-muted-foreground mb-6">{block.images.length} imagens</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {block.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="group relative rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => handleDownload(image.src, image.name)}
                  >
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center">
                        <Download className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">{image.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <footer className="text-center text-muted-foreground py-8">
          <p>Método 8X - Assets VSL</p>
        </footer>
      </div>
    </div>
  );
};

export default VSLAssets;
