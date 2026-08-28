

function Jumbotron({ background }) {
  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage: `url(${background})`,
        height: "200px",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container d-flex flex-column text-white text-center gap-2 justify-content-center h-100">
        
      </div>
    </div>
  );
}

export default Jumbotron;