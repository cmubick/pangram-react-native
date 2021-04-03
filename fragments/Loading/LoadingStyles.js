module.exports = {
container: {
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              width: "auto",
              height: "100px",
              opacity: 0.45,
              textAlign: "center"
            },
container_img: {
                  display: "flex",
                  alignSelf: "center",
                  height: "100%",
                  width: "auto",
                  maxWidth: "100px",
                  maxHeight: "100px",
                  margin: "0 0 20px 0",
                  animationDuration: "0.4s",
                  animationName: "pulse",
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationTimingFunction: "ease",
                  filter: "none",
                          WebkitFilter: "grayscale(100%)",
                          MozFilter: "grayscale(100%)",
                          msFilter: "grayscale(100%)",
                          OFilter: "grayscale(100%)"
                },
container_p: { fontSize: "22px", color: "rgba(255,255,255,0.5)" },
"@keyframes pulse": {
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.15)" }
}
}
