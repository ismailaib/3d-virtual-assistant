import React from "react";
import { useGLTF } from "@react-three/drei";

const Environement = (props) => {
  const { scene } = useGLTF("/models/environement.glb");

  return <primitive object={scene} {...props} />;
};

export default Environement;
