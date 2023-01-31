import Image from "next/image";
import React from "react";
import heroimg from "../../public/1673722317147.jpg";

const Hero = () => {
  return (
    <section>
      <div>
        <Image
          src={heroimg}
          alt="hero image"
          width="1000"
          height="1000"
          className="w-full h-96 object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
