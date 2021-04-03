module.exports = {
    container: {
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  width: "auto",
                  maxWidth: "300px",
                  margin: "8px"
                },
    list: { margin: "6px 0px" },
    listItem: { fontSize: "14px" },
    feedback: { fontSize: "14px" },
    a: { fontSize: "14px" },
    container_button: {
                         color: "black",
                         backgroundColor: "#e6e6e6",
                         border: "#F8E71C 1px solid",
                         fontSize: "18px",
                         height: "40px",
                         width: "40px",
                         borderRadius: "40px",
                         outline: "none",
                         cursor: "pointer",
                         fontWeight: 700,
                         paddingTop: "6px",
                         position: "absolute",
                         top: "16px",
                         right: "4px"
                       },
    //".container button:hover": { backgroundColor: "rgb(211, 211, 211)" },
    title: { fontSize: "22px", fontWeight: 700, margin: "16px 0 16px 0" },
    heading: { fontSize: "16px", fontWeight: 700 },
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
