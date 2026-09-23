export function Rating({ rating }) {
  let styleObj = {
    width: "10vh",
    height: "3vh",
    borderRadius: "10px",
    display: "grid",
    placeItems: "center",
    fontFamily: "Arial",
    fontWeight: "bold",
  };

  let text = "";

  switch (rating) {
    case 0:
      styleObj.backgroundColor = "#7137E6";
      styleObj.color = "white";
      text = "Broken";
      break;
    case 1:
      styleObj.backgroundColor = "#C0573A";
      styleObj.color = "white";
      text = "Bronze";
      break;
    case 2:
      styleObj.backgroundColor = "#CFCFCF";
      text = "Silver";
      styleObj.color = "black";
      break;
    case 3:
      styleObj.backgroundColor = "gold";
      text = "Gold";
      styleObj.color = "black";
      break;
    case 4:
      styleObj.backgroundColor = "#A4E2F9";
      text = "Diamond";
      styleObj.color = "black";
      break;

    default:
      return <div>Rating non valido</div>;
  }

  return <div style={styleObj}>{text}</div>;
}
