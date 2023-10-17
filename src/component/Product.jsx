import React, { useState } from "react";
import black from "../images/black.avif";
import white from "../images/white.jpg";
import grey from "../images/grey.webp";
import blue from "../images/blue.jpg";
import red from "../images/red.webp";
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import axios from "axios";

const Product = () => {
  const [selectedColor, setSelectedColor] = useState(black);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        })
        .then((response) => {
          // Handle success
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Card style={{ height: "100vh", width: "60vw" }}>
        <CardContent>
          <img
            src={selectedColor}
            alt="T-shirt"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </CardContent>
      </Card>
      <Card style={{ height: "100vh", width: "60vw" }}>
        <CardContent>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Settings
          </Typography>
          <Typography style={{ textAlign: "left" }}>
            Change T-shirt Color
          </Typography>
          <div style={{ display: "flex", gap: 35, marginTop: 10 }}>
            <img
              src={white}
              alt="white"
              style={{ height: "10vh", width: "5vw" }}
              onClick={() => handleColorChange(white)}
            />
            <img
              src={black}
              alt="black"
              style={{ height: "10vh", width: "5vw" }}
              onClick={() => handleColorChange(black)}
            />
            <img
              src={grey}
              alt="grey"
              style={{ height: "10vh", width: "5vw" }}
              onClick={() => handleColorChange(grey)}
            />
            <img
              src={blue}
              alt="blue"
              style={{ height: "10vh", width: "5vw" }}
              onClick={() => handleColorChange(blue)}
            />
            <img
              src={red}
              alt="red"
              style={{ height: "10vh", width: "5vw" }}
              onClick={() => handleColorChange(red)}
            />
          </div>
          <hr />
          <Typography component={"div"} style={{ marginTop: 10 }}>
            <Typography style={{ textAlign: "left" }}>Change Image</Typography>
            <Typography
              component={"div"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="file"
                  accept=".avif, .jpg, .webp"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  <Button
                    variant="contained"
                    component="span"
                    style={{ textTransform: "capitalize" }}
                  >
                    Choose File
                  </Button>
                </label>

                <Button
                  variant="contained"
                  onClick={handleUpload}
                  style={{ textTransform: "capitalize", marginTop: 10 }}
                >
                  Upload Now
                </Button>
              </div>
              <div>
                {selectedFile && (
                  <div>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress}
                    />
                    <Typography>{uploadProgress.toFixed(2)}%</Typography>
                  </div>
                )}
              </div>
            </Typography>
          </Typography>
          <hr />
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
