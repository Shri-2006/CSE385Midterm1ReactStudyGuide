import { useState } from "react";

const topics = [
  { id: "asymptotic", label: "Asymptotic Analysis", emoji: "📐" },
  { id: "recurrence", label: "Recurrence Methods", emoji: "🔄" }, // NEW
  { id: "sorting", label: "Sorting Theory", emoji: "🔢" }, // ENHANCED
  { id: "master", label: "Master Theorem", emoji: "📜" },
  { id: "dnc", label: "Divide & Conquer", emoji: "✖️" }, // MERGED KARATSUBA/STRASSEN
  { id: "fft", label: "FFT & Polynomials", emoji: "🌊" },
];

const Block = ({ children, color = "#1e293b" }) => (
  <div style={{ background: color, borderRadius: 10, padding: "16px 20px", marginBottom: 16, border: "1px solid #334155" }}>
    {children}
  </div>
);

const Code = ({ children }) => (
  <pre style={{ background: "#0f172a", color: "#7dd3fc", borderRadius: 8, padding: "14px 18px", fontFamily: "'Fira Mono', 'Courier New', monospace", fontSize: 13, overflowX: "auto", lineHeight: 1.7, margin: "12px 0", border: "1px solid #1e3a5f" }}>
    {children}
  </pre>
);

const Math = ({ children }) => (
  <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#f0abfc", fontSize: "1.05em" }}>{children}</span>
);

const MathBlock = ({ children }) => (
  <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#f0abfc", fontSize: "1.1em", textAlign: "center", padding: "14px 0", letterSpacing: 0.5 }}>{children}</div>
);

const H2 = ({ children }) => (
  <h2 style={{ color: "#f8fafc", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6em", marginBottom: 6, marginTop: 0, borderBottom: "1px solid #334155", paddingBottom: 10 }}>{children}</h2>
);

const H3 = ({ children }) => (
  <h3 style={{ color: "#94a3b8", fontFamily: "Georgia, serif", fontSize: "1.05em", marginBottom: 8, marginTop: 18, textTransform: "uppercase", letterSpacing: 1.5 }}>{children}</h3>
);

const P = ({ children }) => (
  <p style={{ color: "#cbd5e1", lineHeight: 1.8, margin: "8px 0", fontSize: 15 }}>{children}</p>
);

const Callout = ({ title, children, color = "#6366f1" }) => (
  <div style={{ borderLeft: `3px solid ${color}`, background: color + "11", borderRadius: "0 8px 8px 0", padding: "12px 16px", margin: "14px 0" }}>
    {title && <div style={{ color, fontWeight: 700, marginBottom: 6, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>}
    <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i} style={{ background: "#1e3a5f", color: "#7dd3fc", padding: "8px 14px", textAlign: "left", border: "1px solid #334155" }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: "8px 14px", border: "1px solid #1e293b", color: i % 2 === 0 ? "#e2e8f0" : "#cbd5e1", background: i % 2 === 0 ? "#0f172a" : "#111827" }}>{c}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
);

const content = {
  asymptotic: () => (
    <div>
      <H2>📐 Asymptotic Analysis & Limits</H2>
      <P>In a formal analysis class, you must be able to prove relationships using limits rather than just "dropping constants."</P>

      <H3>Limit Definitions</H3>
      <Block>
        <P>To compare <Math>f(n)</Math> and <Math>g(n)</Math>, compute <Math>L = lim (n→∞) f(n)/g(n)</Math>:</P>
        <P>• <Math>L = 0</Math>: <Math>f(n) = o(g(n))</Math> (strictly smaller)</P>
        <P>• <Math>L = c &gt; 0</Math>: <Math>f(n) = Θ(g(n))</Math> (same rate)</P>
        <P>• <Math>L = ∞</Math>: <Math>f(n) = ω(g(n))</Math> (strictly larger)</P>
      </Block>

      <H3>The Big-O Hierarchy (Exam Proof Tip)</H3>
      <P>Use <strong>L'Hopital's Rule</strong> if you encounter <Math>∞/∞</Math> when comparing logs vs. polynomials or polynomials vs. exponentials.</P>
      <MathBlock>log(n) ≪ n^ε ≪ n^c ≪ c^n ≪ n! ≪ n^n</MathBlock>
    </div>
  ),

  recurrence: () => (
    <div>
      <H2>🔄 Recurrence Resolution Techniques</H2>
      <P>Beyond the Master Theorem, analysis classes require the <strong>Recursion Tree</strong> and <strong>Substitution Method</strong>.</P>

      <H3>1. Substitution Method (Induction)</H3>
      <Callout title="The Process" color="#10b981">
        1. Guess the form of the solution (e.g., <Math>O(n log n)</Math>).<br/>
        2. Use mathematical induction to find the constants <Math>c</Math> and <Math>n₀</Math> that make the inequality work.
      </Callout>

      <H3>2. Recursion Tree Method</H3>
      <P>Ideal for non-symmetric recurrences like <Math>T(n) = T(n/3) + T(2n/3) + O(n)</Math>.</P>
      <Code>{`Total work = Σ (work at level i)
1. Determine depth of tree (shortest vs longest path).
2. Sum the work at each horizontal level.
3. Account for the 'ragged' bottom of the tree if paths differ.`}</Code>
    </div>
  ),

  sorting: () => (
    <div>
      <H2>🔢 Sorting: Stability and Lower Bounds</H2>
      <P>For analysis, we care about the <strong>Decision Tree Model</strong> and why we can't do better than <Math>n log n</Math> for comparisons.</P>

      <H3>Comparison Sorting Cheat Sheet</H3>
      <Table
        headers={["Algorithm", "Best", "Average", "Worst", "Space", "Stable?"]}
        rows={[
          ["Insertion", "O(n)", "O(n²)", "O(n²)", "O(1)", "✅"],
          ["Selection", "O(n²)", "O(n²)", "O(n²)", "O(1)", "❌"],
          ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "✅"],
          ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "❌"],
          ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)", "❌"],
        ]}
      />

      <H3>The Ω(n log n) Lower Bound</H3>
      <P>Any comparison-based sort must have a decision tree with <Math>n!</Math> leaves. The height of this tree is <Math>log(n!) ≈ n log n</Math>.</P>
    </div>
  ),

  master: () => (
    <div>
      <H2>📜 Master Theorem: The Advanced View</H2>
      <P>Analysis exams often give "trap" recurrences where the Master Theorem cannot be used.</P>

      <H3>The "Forbidden" Cases</H3>
      <Callout title="Do NOT use Master Theorem if:" color="#f87171">
        • <Math>a</Math> is not a constant (e.g., <Math>T(n) = n·T(n/2) + n</Math>).<br/>
        • <Math>f(n)</Math> is not polynomial (e.g., <Math>T(n) = 2T(n/2) + 2ⁿ</Math>).<br/>
        • The gap between <Math>f(n)</Math> and the critical exponent is not polynomial (e.g., <Math>f(n) = n log n</Math>).
      </Callout>

      <H3>Case 2 Expanded</H3>
      <P>If <Math>f(n) = Θ(n^{log_b a} · log^k n)</Math>, then <Math>T(n) = Θ(n^{log_b a} · log^{k+1} n)</Math>.</P>
    </div>
  ),

  dnc: () => (
    <div>
      <H2>✖️ Advanced Divide & Conquer</H2>
      <P>The core theme: reducing the number of recursive subproblems (<Math>a</Math>) to lower the exponent.</P>

      <H3>The "Subtraction Trick"</H3>
      <Table
        headers={["Algorithm", "Subproblems (a)", "Standard", "Complexity"]}
        rows={[
          ["Karatsuba", "3", "4", "O(n^{log₂3}) ≈ O(n^{1.58})"],
          ["Strassen", "7", "8", "O(n^{log₂7}) ≈ O(n^{2.81})"],
        ]}
      />
      <Callout color="#6366f1">
        <strong>Strassen's Fact:</strong> We save one multiplication at the cost of many more additions. Because additions are <Math>O(n²)</Math> and multiplications are <Math>O(n³)</Math>, the trade-off only wins at scale.
      </Callout>
    </div>
  ),

  fft: () => (
    <div>
      <H2>🌊 FFT & Roots of Unity</H2>
      <P>The FFT is the ultimate Divide & Conquer application, moving from Coefficient Form to Point-Value Form.</P>
      <H3>Why Roots of Unity?</H3>
      <P>They provide the <strong>Symmetry Property</strong> (<Math>ω_n^{k + n/2} = -ω_n^k</Math>) and the <strong>Halving Property</strong>.</P>
      <Block>
        <P>1. <strong>Divide:</strong> Split by even/odd indices.<br/>
        2. <strong>Recurse:</strong> Evaluate at <Math>n/2</Math> points.<br/>
        3. <strong>Combine:</strong> Use the "Butterfly" operation.</P>
      </Block>
    </div>
  ),
};

export default function AlgorithmsGuide() {
  const [active, setActive] = useState("asymptotic");

  return (
    <div style={{ minHeight: "100vh", background: "#080f1a", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: "#0d1b2a", borderRight: "1px solid #1e3a5f", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1e3a5f", marginBottom: 12 }}>
          <div style={{ color: "#7dd3fc", fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Analysis Guide</div>
          <div style={{ color: "#f8fafc", fontWeight: 700, fontSize: 16, marginTop: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>CSE 385 / CS 101</div>
        </div>
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "10px 20px", border: "none", cursor: "pointer",
              background: active === t.id ? "#1e3a5f" : "transparent",
              color: active === t.id ? "#7dd3fc" : "#94a3b8",
              borderLeft: active === t.id ? "3px solid #3b82f6" : "3px solid transparent",
              fontSize: 13, fontWeight: active === t.id ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            <span style={{ marginRight: 8 }}>{t.emoji}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto", maxWidth: 900 }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Fira+Mono&display=swap" rel="stylesheet" />
        {content[active]?.()}
      </div>
    </div>
  );
}