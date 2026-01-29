import "./index.css";
import { Composition } from "remotion";
import { MozartSonataFacile } from "./videos/01-MozartSonataFacile";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="01-MozartSonataFacile"
        component={MozartSonataFacile}
        durationInFrames={26 * 30} // 26 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
