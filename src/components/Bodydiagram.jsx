import React, { useState } from "react";
import Image from "../assets/Human.jpg";

const BodyDiagram = () => {
  const [selectedPart, setSelectedPart] = useState(null);

  const handleClick = (part) => {
    setSelectedPart(part);
    alert(part);
  };

  return (
    <div>
      <img src={Image} alt="Human body diagram" useMap="#bodyMap" />

      <map name="bodyMap">
        <area
          target=""
          alt=""
          onClick={() => handleClick("Lungs")}
          title=""
          href=""
          coords="219,321,217,304,217,284,220,269,226,243,241,220,255,208,268,211,278,227,277,247,278,264,277,291,274,306,251,317,235,319"
          shape="poly"
        />
        <area
          target=""
          alt=""
          title=""
          href=""
          coords="307,110,320,95,308,66,283,56,254,63,248,82,243,107,262,116,275,125,292,116"
          shape="poly"
          onClick={() => handleClick("Brain")}
        />
        <area
          target=""
          alt=""
          title=""
          href=""
          coords="301,315,297,302,281,293,269,314,242,317,224,322,232,355,239,377,280,344,303,338,320,326"
          shape="poly"
          onClick={() => handleClick("Liver")}
        />
        <area
          target=""
          alt=""
          title=""
          href=""
          coords="318,357,300,367,282,377,262,359,243,372,224,403,223,428,229,449,239,475,256,494,280,491,306,489,324,458,341,421,336,393"
          shape="poly"
          onClick={() => handleClick("Intestine")}
        />
        <area
          target=""
          alt=""
          title=""
          href=""
          coords="278,481,263,495,269,523,264,540,270,555,288,562,301,548,293,521,296,503,296,485"
          shape="poly"
          onClick={() => handleClick("Penis")}
        />
      </map>

    </div>
  );
};

export default BodyDiagram;
