import React, { useState } from "react";

const Translate = () => {
  const [text, setText] = useState("");
  const [direction, setDirection] = useState("ja-vi"); // ja-vi: Nhật→Việt, vi-ja: Việt→Nhật
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, direction }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(data.message || "Lỗi dịch thuật");
      }
    } catch (err) {
      setResult("Lỗi kết nối server");
    }
    setLoading(false);
  };

  return (
    <div className="translate-page" style={{ maxWidth: 600, margin: "auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 0 10px #eee" }}>
      <h2>Dịch</h2>
      <form onSubmit={handleTranslate} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <textarea
          rows={5}
          placeholder="Nhập văn bản cần dịch..."
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>
            <input
              type="radio"
              name="direction"
              value="ja-vi"
              checked={direction === "ja-vi"}
              onChange={() => setDirection("ja-vi")}
            />
            Nhật → Việt
          </label>
          <label>
            <input
              type="radio"
              name="direction"
              value="vi-ja"
              checked={direction === "vi-ja"}
              onChange={() => setDirection("vi-ja")}
            />
            Việt → Nhật
          </label>
          <button type="submit" disabled={loading} style={{ padding: "0.5rem 1.5rem" }}>
            {loading ? "Đang dịch..." : "Dịch"}
          </button>
        </div>
      </form>
      <div style={{ marginTop: 24, minHeight: 40, background: "#f9f9f9", borderRadius: 4, padding: 12 }}>
        {result}
      </div>
    </div>
  );
};

export default Translate;
