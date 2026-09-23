import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Rating } from "./Rating";
import "./common.css";
import "./Form.css";

const RATINGS = [
  { value: 0, label: "Broken" },
  { value: 1, label: "Bronze" },
  { value: 2, label: "Silver" },
  { value: 3, label: "Gold" },
  { value: 4, label: "Diamond" },
];

const D3D9_OPTIONS = ["wined3d", "in game folder", "dxvk"];
const VIDEO_OPTIONS = ["Framebuffer", "Compositor"];

const OC_LABELS = ["CPU", "GPU", "RAM"];

function createEmptyForm() {
  return {
    name: "",
    imgSrc: "",
    rating: 0,
    D3D9: "dxvk",
    dxvk_ver: "1.8",
    Video: "Framebuffer",
    OC: false,
    OC_params: ["STOCK", "0", "0"],
    build_ver: "1.0.0",
    desc: "",
  };
}

export default function Form() {
  const navigate = useNavigate();
  const [form, setForm] = useState(createEmptyForm);
  const [copied, setCopied] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateOcParam = (index, value) =>
    setForm((prev) => ({
      ...prev,
      OC_params: prev.OC_params.map((old, i) => (i === index ? value : old)),
    }));

  const json = useMemo(() => {
    const output = {
      name: form.name,
      imgSrc: form.imgSrc,
      rating: form.rating,
      D3D9: form.D3D9,
      ...(form.D3D9 === "dxvk" ? { dxvk_ver: form.dxvk_ver } : {}),
      Video: form.Video,
      OC: form.OC,
      OC_params: form.OC_params,
      build_ver: form.build_ver,
      desc: form.desc,
    };
    return JSON.stringify(output, null, 2);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(json)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="form-page">
      <div className="content-wrapper">
        <section>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome gioco</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ultimate spider-man"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imgSrc">Immagine</label>
                <input
                  type="text"
                  id="imgSrc"
                  name="imgSrc"
                  value={form.imgSrc}
                  onChange={(e) => update("imgSrc", e.target.value)}
                  placeholder="./img/ultimate-spider-man.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <div className="select-row">
                  <div className="select-wrap">
                    <select
                      id="rating"
                      name="rating"
                      value={form.rating}
                      onChange={(e) => update("rating", Number(e.target.value))}
                    >
                      {RATINGS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.value} - {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Rating rating={form.rating} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="D3D9">D3D9</label>
                <div className="select-wrap">
                  <select
                    id="D3D9"
                    name="D3D9"
                    value={form.D3D9}
                    onChange={(e) => update("D3D9", e.target.value)}
                  >
                    {D3D9_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {form.D3D9 === "dxvk" && (
                <div className="form-group">
                  <label htmlFor="dxvk_ver">DXVK version</label>
                  <input
                    type="text"
                    id="dxvk_ver"
                    name="dxvk_ver"
                    value={form.dxvk_ver}
                    onChange={(e) => update("dxvk_ver", e.target.value)}
                    placeholder="1.8"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="Video">Video</label>
                <div className="select-wrap">
                  <select
                    id="Video"
                    name="Video"
                    value={form.Video}
                    onChange={(e) => update("Video", e.target.value)}
                  >
                    {VIDEO_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="OC"
                  name="OC"
                  checked={form.OC}
                  onChange={(e) => update("OC", e.target.checked)}
                />
                <label htmlFor="OC">Overclock (OC)</label>
              </div>

              {form.OC && (
                <div className="oc-grid">
                  {OC_LABELS.map((label, index) => (
                    <div className="form-group" key={label}>
                      <label htmlFor={`oc-${label}`}>{label}</label>
                      <input
                        type="text"
                        id={`oc-${label}`}
                        name={`oc-${label}`}
                        value={form.OC_params[index]}
                        onChange={(e) => updateOcParam(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="build_ver">Build / Autorun version</label>
                <input
                  type="text"
                  id="build_ver"
                  name="build_ver"
                  value={form.build_ver}
                  onChange={(e) => update("build_ver", e.target.value)}
                  placeholder="1.0.0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="desc">Descrizione</label>
                <textarea
                  id="desc"
                  name="desc"
                  rows={6}
                  value={form.desc}
                  onChange={(e) => update("desc", e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {copied ? "Copiato!" : "Copia JSON"}
                </button>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setForm(createEmptyForm())}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="json-container">
            <div className="form-group json-output">
              <label htmlFor="JSON">Output JSON:</label>
              <textarea
                name="JSON"
                id="JSON"
                readOnly
                value={json}
                spellCheck={false}
              />
              <div className="admin-actions">
                <button
                  type="button"
                  className="home-btn"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
                <button
                  type="button"
                  className="home-btn"
                  onClick={() => {
                    const title = `[Request] ${form.name || "Untitled"}`;
                    const body = "```json\n" + json + "\n```";
                    const url =
                      `https://github.com/autorun-db/autorun-db.github.io/issues/new` +
                      `?title=${encodeURIComponent(title)}` +
                      `&body=${encodeURIComponent(body)}`;
                    window.open(url, "_blank");
                  }}
                >
                  Open Request
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
