import React, { useRef, useState } from "react"
import "./Main.css"
import default_image from "../Assests/AI_Image.png"

const Main = () => {
  const [image, setImage] = useState("/")
  const inputRef = useRef(null)

  const generate = async () => {
    if (inputRef.current.value === "") {
      alert("plaese provide Valid Propmt...")
      return
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
        }),
      }
    )
    const data = await response.json()
    setImage(data.data[0].url)
    console.log(data.data[0].url)
  }

  return (
    <div className="background">
      <div className="card">
        <h1>
          Text=>to=> <span>Image</span>
        </h1>
        <img src={image === "/" ? default_image : image} alt="" />
        <div className="input-container">
          <input
            type="search"
            ref={inputRef}
            placeholder="Generate Image With Your Text"
          />
          <button onClick={() => generate()}>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default Main
