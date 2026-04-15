import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IFEM Education — Nigeria's Gateway to UK Universities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#faf8f3",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left panel — cream, main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 64px",
            borderRight: "1px solid rgba(143,178,144,0.3)",
          }}
        >
          {/* Top: eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#006b38" }} />
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#006b38",
              }}
            >
              IFEM Education
            </span>
          </div>

          {/* Middle: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: 700,
                color: "#2d2d2d",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              We Get Nigerian Students Into UK Universities.
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "18px",
                color: "#6b7280",
                lineHeight: 1.5,
                maxWidth: "480px",
              }}
            >
              Free admission processing. Expert visa guidance. 40+ partner universities.
            </div>
          </div>

          {/* Bottom: stats row */}
          <div style={{ display: "flex", gap: "40px" }}>
            {[
              { value: "99.6%", label: "Visa Success" },
              { value: "1,800+", label: "Students Placed" },
              { value: "40+", label: "Universities" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#006b38",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — forest green */}
        <div
          style={{
            width: "360px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#006b38",
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Watermark number */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              fontSize: "200px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            99
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Free Service
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.3,
              }}
            >
              No hidden fees. No commissions from students.
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.5,
                marginTop: "8px",
              }}
            >
              ifemeducation.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
