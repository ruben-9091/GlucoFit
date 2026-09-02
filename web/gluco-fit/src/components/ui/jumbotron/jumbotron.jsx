function Jumbotron({ background, video }) {
  return (
    <div
      className="jumbotron position-relative overflow-hidden"
      style={{
        height: "200px",
        backgroundColor: "black",
        ...(background && !video
          ? {
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}),
      }}
    >
      {/* Si hay un vídeo, se renderiza la etiqueta <video> ocupando todo el fondo */}
      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ zIndex: 0 }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Contenido por encima del fondo */}
      <div 
        className="container d-flex flex-column text-white text-center gap-2 justify-content-center h-100 position-relative"
        style={{ zIndex: 1 }}
      >
        {/* Tu contenido aquí */}
      </div>
    </div>
  );
}

export default Jumbotron;