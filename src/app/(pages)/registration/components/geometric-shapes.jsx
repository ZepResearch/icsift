export const GeometricShapes = () => {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large blob in top right */}
        <div
          className="absolute -right-40 -top-40 w-[30rem] h-[30rem] opacity-20"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            background: "linear-gradient(45deg, #d3e4c5, #4d724d)",
          }}
        ></div>
  
        {/* Small circle in bottom left */}
        <div className="absolute left-20 bottom-20 w-16 h-16 rounded-full bg-[#d3e4c5]/40"></div>
  
        {/* Medium circle in top left */}
        <div className="absolute -left-10 top-40 w-32 h-32 rounded-full bg-[#b9d4a3]/30"></div>
  
        {/* Small blob in bottom right */}
        <div
          className="absolute right-20 bottom-40 w-24 h-24 opacity-30"
          style={{
            borderRadius: "70% 30% 50% 50% / 40% 60% 40% 60%",
            background: "linear-gradient(45deg, #b9d4a3, #4d724d)",
          }}
        ></div>
  
        {/* Medium blob in center left */}
        <div
          className="absolute left-1/4 top-1/2 w-40 h-40 opacity-20"
          style={{
            borderRadius: "40% 60% 70% 30% / 50% 50% 50% 50%",
            background: "linear-gradient(45deg, #d3e4c5, #b9d4a3)",
          }}
        ></div>
      </div>
    )
  }
  