import './App.css';
import React, { useState, useEffect, Fragment } from "react";

import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: "wBuild/WegGLbuild.loader.js",
    dataUrl: "wBuild/WegGLbuild.data",
    frameworkUrl: "wBuild/WegGLbuild.framework.js",
    codeUrl: "wBuild/WegGLbuild.wasm",
  });

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <Fragment className="container">
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <button className="full-screen" onClick={handleClickEnterFullscreen}>Enter Fullscreen</button>
      <Unity className="unity" unityProvider={unityProvider} style={{ width: windowSize[0], height: windowSize[1] }} />

    </Fragment>
  );
}

export default App;
