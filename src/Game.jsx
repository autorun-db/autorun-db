import { Rating } from "./Rating";
import "./Game.css";

export function Game({ gioco }) {
  return (
    <div className="outer_card">
      <div className="inner_card">
        <div className="cover">
          <img src={gioco.imgSrc}></img>
        </div>
        <div className="params">
          <div className="title">
            <p>{gioco.name}</p>
            <Rating rating={gioco.rating} />
          </div>

          <p>D3D9: {gioco.D3D9}</p>
          {gioco.D3D9 === "dxvk" ? <p>DXVK VER: {gioco.dxvk_ver}</p> : <></>}
          <p>Window: {gioco.Video}</p>
          {gioco.OC ? (
            <>
              <p>CPU: {gioco.OC_params[0]}</p>
              <p>GPU: {gioco.OC_params[1]}</p>
              <p>RAM: {gioco.OC_params[2]}</p>
            </>
          ) : (
            <p>OC: NO</p>
          )}
          <p>Autorun: {gioco.build_ver}</p>
        </div>
      </div>
      <textarea readOnly value={gioco.desc}></textarea>
      <button
        onClick={() => {
          window.open(gioco.patch_link, "_blank");
        }}
      >
        Download patchset
      </button>
    </div>
  );
}
