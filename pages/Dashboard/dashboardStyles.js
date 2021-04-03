module.exports = {
navigationContainer: {
                        width: "100%",
                        backgroundColor: "black",
                        border: "#8c8c8c 1px solid",
                        borderRadius: "15px",
                        padding: "8px"
                      },
welcomeMessage: {
                   display: "flex",
                   flexDirection: "column",
                   alignContent: "center",
                   textAlign: "center",
                   width: "100%",
                   height: "auto",
                   fontSize: "28px"
                 },
artwork: {
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            height: "50px",
            marginRight: "34px",
            marginTop: "8px"
          },
artwork_img: {
                width: "auto",
                height: "auto",
                alignSelf: "center",
                maxHeight: "100%",
                maxWidth: "500px",
                userSelect: "none"
              },
//"::-moz-selection": { background: "#fd5750", color: "#ffffff", opacity: 1 },
//"::selection": { background: "#fd5750", color: "#ffffff", opacity: 1 },
wordEntryWrapper: {
                     display: "flex",
                     marginLeft: "auto",
                     marginRight: "auto",
                     textAlign: "center",
                     justifyContent: "center"
                   },
wordEntry: {
              fontSize: "28px",
              fontWeight: 700,
              height: "58px",
              width: "300px",
              borderBottom: "1px #F8E71C solid"
            },
buttonWrapper: {
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: "-18px",
                  pointerEvents: "none"
                },
buttonSpacer: { width: "50px" },
letterButton: {
                 color: "black",
                 backgroundColor: "#e6e6e6",
                 fontSize: "24px",
                 width: "60px",
                 height: "60px",
                 borderRadius: "60px",
                 outline: "none",
                 cursor: "pointer",
                 marginLeft: "40px",
                 marginRight: "40px",
                 fontWeight: 700,
                 border: "#F8E71C 1px solid",
                 pointerEvents: "all",
                 textAlign: "center",
                 padding: "0px"
               },
letterButton_span: {
                      color: "black",
                      padding: "0px",
                      position: "relative",
                      top: "2px"
                    },
magicLetterButton: {
                      color: "black",
                      fontSize: "24px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "60px",
                      outline: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      border: "#F8E71C 1px solid",
                      backgroundColor: "#F8E71C",
                      pointerEvents: "all",
                      padding: "0px"
                    },
//".magicLetterButton:hover: { backgroundColor: "#e9d81d" },
//".letterButton:hover": { backgroundColor: "rgb(211, 211, 211)" },
magicLetterButton_span: {
                           color: "black",
                           padding: "0px",
                           position: "relative",
                           top: "2px"
                         },
errorWrapper: {
                 textAlign: "center",
                 height: "58px",
                 fontSize: "22px",
                 marginTop: "16px"
               },
errorMessage: { color: "#F8E71C" },
gameStats: {
              marginBottom: "18px",
              width: "300px",
              padding: "8px",
              border: "#8c8c8c 1px solid",
              borderRadius: "10px",
              outline: "none",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto"
            },
answersWrapper: {
                   marginBottom: "18px",
                   width: "300px",
                   padding: "8px",
                   border: "#8c8c8c 1px solid",
                   borderRadius: "10px",
                   outline: "none",
                   marginLeft: "auto",
                   marginRight: "auto",
                   fontWeight: "400 !important",
                   fontSize: "18px !important"
                 },
words: { fontWeight: "400 !important", fontSize: "18px !important" },
words_span: { fontWeight: "400 !important", fontSize: "18px !important" },
points: {
           color: "#F8E71C !important",
           fontWeight: "400 !important",
           fontSize: "18px !important",
           display: "flex",
           justifyContent: "space-between"
         },
points_div: {
               color: "#F8E71C !important",
               fontWeight: "400 !important",
               fontSize: "16px !important",
               width: "30%",
               textAlign: "center"
             },
timer: {
          color: "#F8E71C !important",
          fontWeight: "400 !important",
          fontSize: "18px !important",
          width: "200px"
        },
loadingWrapper: {
                   textAlign: "center",
                   marginTop: "48px",
                   width: "100%",
                   height: "calc(100% - 40px)"
                 },
loadingMessage: { fontSize: "22px", color: "#F8E71C", marginTop: "16px" },
actionButtonWrapper: {
                        width: "300px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "32px",
                        marginLeft: "auto",
                        marginRight: "auto"
                      },
shuffleButton: {
                  color: "black",
                  backgroundColor: "#e6e6e6",
                  fontSize: "24px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "60px",
                  outline: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  border: "#F8E71C 1px solid",
                  pointerEvents: "all",
                  textAlign: "center",
                  padding: "8px 0px 0px 0px"
                },
actionButton: {
                 color: "black",
                 backgroundColor: "#e6e6e6",
                 border: "#F8E71C 1px solid",
                 fontSize: "18px",
                 width: "108px",
                 height: "60px",
                 borderRadius: "60px",
                 outline: "none",
                 cursor: "pointer",
                 fontWeight: 700
               },
letterButtonContainer: {
                          width: "300px",
                          textAlign: "center",
                          marginTop: "16px",
                          marginLeft: "auto",
                          marginRight: "auto"
                        },
topNav: { display: "flex", justifyContent: "space-between" },
navButton: { padding: "4px", margin: "4px 4px" },
magicLetterEntry: { color: "#F8E71C" }
}
