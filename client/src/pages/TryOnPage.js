import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./TryOnPage.css";

const TryOnPage = () => {
  const location = useLocation();
  const clothImageUrl = location.state?.clothImage || "";
  const [userImage, setUserImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedClothing, setSelectedClothing] = useState("");
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "user") {
        setUserImage(file);
        const clothImg = document.querySelector("#clothImg");
        setClothImage(clothImg.src);
        console.log(`Cloth image src: ${clothImg.src}`);
        console.log(`User image preview: ${URL.createObjectURL(file)}`);
      }
    }
  };

  const handleTryOn = async () => {
    try {
      if (!userImage || !clothImage) {
        console.error("Error: Both user image and cloth image are required.");
        setErrorMessage("Both user image and cloth image are required.");
        return;
      }

      setLoading(true);
      setErrorMessage("");

      console.log("Sending Try-On request...");

      // Upload user image
      const userFormData = new FormData();
      userFormData.append("image", userImage);
      const targetResponse = await axios.post(
        "http://localhost:5050/apps/proxy/upload",
        userFormData
      );

      const response = await fetch(clothImage);
      const blob = await response.blob();
      const clothImage_file = new File([blob], "image.jpg", {
        type: blob.type,
      });

      console.log(`cloth image in handletryon: ${clothImage_file}`);
      console.log(clothImage_file instanceof File);

      // Upload cloth image
      const clothFormData = new FormData();
      clothFormData.append("image1", clothImage_file);
      const sourceResponse = await axios.post(
        "http://localhost:5050/apps/proxy/upload1",
        clothFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const targetUrl = targetResponse.data.url;
      const sourceUrl = sourceResponse.data.url;

      console.log("Target URL:", targetUrl);
      console.log("Source URL:", sourceUrl);

      // Try-On API call
      const tryOnResponse = await axios.post(
        "http://localhost:5050/api/v1/tryon",
        {
          target_file_url: targetUrl,
          source_file_url: sourceUrl,
          clothing_type: selectedClothing, // 👈 send selected type
        }
      );

      console.log("Try-On API Response:", tryOnResponse.data);

      if (tryOnResponse.data && tryOnResponse.data.result) {
        setResultUrl(tryOnResponse.data.result);
      } else {
        setErrorMessage("Try-On result not available.");
      }
    } catch (error) {
      console.error("Error in Try-On:", error);
      setErrorMessage("An error occurred during the Try-On process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="virtual-tryon-container">
      <h1>Virtual Try-On</h1>
      <div className="both_sections">
        <div className="image-upload-section">
          <h4>Upload Your Photo:</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "user")}
          />

          {userImage && (
            <div className="preview-block">
              <h4>Preview of Your Photo:</h4>
              <img
                src={URL.createObjectURL(userImage)}
                alt="User Preview"
                width="200"
                id="userImg"
              />
            </div>
          )}
        </div>

        {clothImageUrl && (
          <div className="preview-block">
            <h4>Selected Cloth:</h4>
            <img
              id="clothImg"
              src={clothImageUrl}
              alt="Selected Cloth"
              width="200"
            />
          </div>
        )}
        {resultUrl && (
          <div className="result-container preview-block">
            <h3>Try-On Result</h3>
            <img src={resultUrl} alt="Try-on Result" />
          </div>
        )}
      </div>
      <div className="my-4">
        <div>
          <input
            type="radio"
            id="tryShirt"
            name="clothingType"
            value="shirt"
            checked={selectedClothing === "shirt"}
            onChange={() => setSelectedClothing("shirt")}
          />
          <label htmlFor="tryShirt" className="ml-2 mr-4">
            Upper
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="tryTrouser"
            name="clothingType"
            value="trouser"
            checked={selectedClothing === "trouser"}
            onChange={() => setSelectedClothing("trouser")}
          />
          <label htmlFor="tryTrouser" className="ml-2">
           Lower
          </label>
        </div>
      </div>

      <div className="TryOn">
        <button onClick={handleTryOn} disabled={loading}>
          {loading ? "Processing..." : "Try On"}
        </button>
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <style>{`

      .my-4 input[type="radio"] {
  transform: scale(2.5); /* Increase size */
  margin-right: 8px;     /* Optional: spacing between radio and label */
}
.ml-2
{
  color: #FFBE0B;
  margin-left: 10px;
  font-family:poppins;
    font-weight:bold;


}
    .radio-input {
  accent-color: #FFBE0B; /* Change radio color when selected */
}
  .virtual-tryon-container button {
    margin-top: 20px;
    background-color: #FFBE0B;
    color: #1e1e1e;
    border: none;
    padding: 12px 24px;
    font-size: 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family:poppins;
    font-weight:bold;
}

.tryonBtton{
padding: 7px 4rem;
    border-radius: 21px;
    background-color: #3A86FF;
    color: white;
    font-size: 23px;
    font-weight: 400;
    font-family: 'Poppins';
}
.radio-group {
  margin: 20px 0;
}

.radio-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

/* Bigger bullet */
.radio-input {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #FFBE0B; /* light green when selected (Tailwind's green-400) */
}

/* Label styling */
.radio-label {
  font-family: poppins;
    margin-left: 12px;
    font-size: 23px;
    cursor: pointer;
    user-select: none;
}

/* Optional: on hover label color change */
.radio-label:hover {
  color: #3A86FF; /* Tailwind green-500 */
}

.my-4{
display:flex;
gap:3rem;
// border:2px solid white;

}
.
.my-4 div label{
font-size:1.3rem;

}
.both_sections{
display:flex; 
gap:4rem;
}
       .virtual-tryon-container {
    font-family: 'Arial', sans-serif;
    padding: 30px;
    background-color: #1E1E1E;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgb(0 0 0 / 10%);
    max-width: 100%; /* Make it full width */
    width: 100vw; /* Full width of the container */
    margin: 0 auto;
    color: white;
    height: 100vh; /* Full screen height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


        .virtual-tryon-container h1 {
          text-align: center;
          font-family: 'Poppins';
          font-size: 7rem;
          color: #FFBE0B; /* Yellow Heading Text Color */
          margin-bottom: 35px;
        }

        .image-upload-section h4,
        .preview-block h4 {
          color: #FFBE0B; /* Yellow for subtitles */
        }

        .preview-block {
          background-color: #2b2c26; /* Bright Blue */
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }

        .preview-block img {
          width: 100%;
          max-width: 250px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 15px;
        }

        .preview-block input[type="file"] {
          margin-top: 10px;
          padding: 10px;
          border: 2px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
          width: 90%;
        }

        .tryon-button {
          display: block;
          margin: 30px auto 0;
          background-color: #3A86FF; /* Bright Blue Button Color */
          color: #ffffff;
          border: none;
          padding: 14px 30px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .tryon-button:hover {
          background-color: #2a6bbf; /* Slightly Darker Blue */
        }

        .result-container {
          text-align: center;
          margin-top: 20px;
        }

        .result-container img {
          max-width: 100%;
          width: 300px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        button:disabled {
          background-color: #A4A4A4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default TryOnPage;
