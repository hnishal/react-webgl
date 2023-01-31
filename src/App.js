import './App.css';
import React, { useState, useEffect } from "react";
import { BiFullscreen } from "react-icons/bi";
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
    if (isLoaded === true)
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

  const loadingPercentage = Math.round(loadingProgression * 100);


  return (
    <div className='container'>
      {isLoaded === false && (
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="unity" unityProvider={unityProvider} style={{ width: windowSize[0], height: windowSize[1] }} />
      <button className="full-screen" onClick={handleClickEnterFullscreen}><BiFullscreen /></button>
    </div>
  );
}

export default App;
