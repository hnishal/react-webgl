import './App.css';
import React, { useState, useEffect, useCallback } from "react";

import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/WegGLbuild.loader.js",
    dataUrl: "Build/WegGLbuild.data",
    frameworkUrl: "Build/WegGLbuild.framework.js",
    codeUrl: "Build/WegGLbuild.wasm",
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="container">
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="unity" unityProvider={unityProvider} />
    </div>
  );
}

export default App;
