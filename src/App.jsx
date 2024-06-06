import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <Loader />
      <Leva />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 40 }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
