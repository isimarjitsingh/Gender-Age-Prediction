import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import ImagePlaceholder from "./ImagePlaceholder";
import I2magePlaceholder from "./I2magePlaceholder";


function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const captureAndPredict = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");

      fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
        })
        .catch((err) => console.error("Prediction error:", err));
    }, "image/jpeg");
  };

  return (
    <div className="app">
      
      <h1>Real-Time Age & Gender Detection with AI-Powered Vision</h1>
      <main>
        <ImagePlaceholder/>
        <h1>Unlock the Power of Facial Recognition</h1>
        <p className="subtitle">
          Discover your age and gender using AI. Position your face in the frame and click predict.
        </p>
        <I2magePlaceholder/>
        

        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline className="video" />
        </div>

        <button onClick={captureAndPredict} className="predict-btn">
          Capture & Predict
        </button>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {result && (
          <div className="results">
            <h2>Recognition Results</h2>
            <p><strong>Gender:</strong> {result.gender}</p>
            <p><strong>Age:</strong> {result.age}</p>
            {/* <p><strong>Accuracy:</strong> </p> */}
          </div>
        )}
      </main>

      <footer>
        {/* FAQ Section */}
        <Footer />
        {/* End of FAQ Section */}

      </footer>
      
    </div>
  );
}

export default Home;

