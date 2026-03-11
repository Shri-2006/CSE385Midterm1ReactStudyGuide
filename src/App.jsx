import { useState } from "react";

const topics = [
  { id: "asymptotic", label: "Asymptotic Analysis", emoji: "📐" },
  { id: "insertion", label: "Insertion Sort", emoji: "🔢" },
  { id: "selection", label: "Selection Sort", emoji: "🔍" },
  { id: "master", label: "Master Theorem", emoji: "📜" },
  { id: "mergesort", label: "Merge Sort", emoji: "✂️" },
  { id: "karatsuba", label: "Karatsuba", emoji: "✖️" },
  { id: "strassen", label: "Strassen", emoji: "🔲" },
  { id: "polymult", label: "Poly Multiplication", emoji: "🧮" },
  { id: "roots", label: "Roots of Unity", emoji: "⭕" },
  { id: "fft", label: "FFT", emoji: "🌊" },
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

const Tag = ({ children, color = "#6366f1" }) => (
  <span style={{ background: color + "33", color, border: `1px solid ${color}66`, borderRadius: 5, padding: "2px 10px", fontSize: 12, fontWeight: 700, marginLeft: 8, verticalAlign: "middle" }}>{children}</span>
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
      <H2>📐 Asymptotic Analysis</H2>
      <P>Asymptotic analysis describes how an algorithm's resource usage (time or space) scales as input size <Math>n → ∞</Math>. We ignore constants and lower-order terms — we care about <em>growth rate</em>, not exact counts.</P>

      <H3>All Five Notations</H3>
      <Table
        headers={["Notation", "Name", "Meaning", "Formal Definition", "Example"]}
        rows={[
          ["O(f(n))", "Big-O", "Asymptotic upper bound (≤)", "∃ c, n₀ : T(n) ≤ c·f(n) ∀ n ≥ n₀", "3n² + 5n = O(n²)"],
          ["Ω(f(n))", "Big-Omega", "Asymptotic lower bound (≥)", "∃ c, n₀ : T(n) ≥ c·f(n) ∀ n ≥ n₀", "n² + 1 = Ω(n)"],
          ["Θ(f(n))", "Theta", "Tight / exact bound (=)", "Both O(f(n)) and Ω(f(n))", "2n² + 3 = Θ(n²)"],
          ["o(f(n))", "Little-o", "Strict upper bound (<, not tight)", "∀ c > 0, ∃ n₀ : T(n) < c·f(n) ∀ n ≥ n₀", "n = o(n²)"],
          ["ω(f(n))", "Little-omega", "Strict lower bound (>, not tight)", "∀ c > 0, ∃ n₀ : T(n) > c·f(n) ∀ n ≥ n₀", "n² = ω(n)"],
        ]}
      />

      <H3>Big vs Little — The Critical Distinction</H3>
      <Block>
        <P><strong style={{color:"#7dd3fc"}}>Big-O vs little-o:</strong> Big-O allows the possibility of equality (T(n) could be Θ(f(n))). Little-o is <em>strictly</em> slower — T(n)/f(n) → 0 as n → ∞.</P>
        <P><strong style={{color:"#7dd3fc"}}>Big-Ω vs little-ω:</strong> Same idea. Big-Ω allows equality. Little-ω is <em>strictly</em> faster — T(n)/f(n) → ∞ as n → ∞.</P>
      </Block>
      <Table
        headers={["Analogy", "Notation", "Meaning"]}
        rows={[
          ["T ≤ f  (≤)", "T(n) = O(f(n))", "T grows no faster than f (possibly equal)"],
          ["T < f  (<)", "T(n) = o(f(n))", "T grows strictly slower than f (never equal rate)"],
          ["T ≥ f  (≥)", "T(n) = Ω(f(n))", "T grows no slower than f (possibly equal)"],
          ["T > f  (>)", "T(n) = ω(f(n))", "T grows strictly faster than f (never equal rate)"],
          ["T = f  (=)", "T(n) = Θ(f(n))", "T and f grow at the same rate"],
        ]}
      />

      <Callout title="Limit Definition (very useful for proofs)" color="#6366f1">
        Given lim(n→∞) T(n)/f(n):<br/>
        • = 0 → T(n) = o(f(n))<br/>
        • = c (constant &gt; 0) → T(n) = Θ(f(n))<br/>
        • = ∞ → T(n) = ω(f(n))<br/>
        • &lt; ∞ (0 or constant) → T(n) = O(f(n))<br/>
        • &gt; 0 (constant or ∞) → T(n) = Ω(f(n))
      </Callout>

      <H3>Growth Rate Hierarchy (slowest → fastest)</H3>
      <MathBlock>O(1) ⊂ O(log n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(n³) ⊂ O(2ⁿ) ⊂ O(n!)</MathBlock>

      <H3>Analyzing Loops — The Rules</H3>
      <Block>
        <P><strong style={{color:"#7dd3fc"}}>Rule 1 — Simple loop:</strong> A loop running <Math>n</Math> times with O(1) body → <Math>O(n)</Math></P>
        <Code>{`for (int i = 0; i < n; i++)     // n iterations
    doSomething();              // O(1) each
// Total: O(n)`}</Code>

        <P><strong style={{color:"#7dd3fc"}}>Rule 2 — Nested loops:</strong> Multiply the iteration counts</P>
        <Code>{`for (int i = 0; i < n; i++)         // n
    for (int j = 0; j < n; j++)     // n
        doSomething();              // O(1)
// Total: O(n²)`}</Code>

        <P><strong style={{color:"#7dd3fc"}}>Rule 3 — Logarithmic loop:</strong> Halving or doubling → O(log n)</P>
        <Code>{`for (int i = 1; i < n; i *= 2)  // i = 1, 2, 4, 8, ... → log₂n steps
    doSomething();
// Total: O(log n)`}</Code>

        <P><strong style={{color:"#7dd3fc"}}>Rule 4 — Triangular nested loops:</strong></P>
        <Code>{`for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++)     // inner runs n-i times
        doSomething();
// Iterations = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²)`}</Code>
      </Block>

      <Callout title="Key Trick" color="#10b981">
        To find the complexity of a loop, ask: <em>"How many times does the innermost operation execute?"</em> Express that count as a function of n, then drop constants and lower-order terms.
      </Callout>

      <H3>Common Summation Identities</H3>
      <Table
        headers={["Sum", "Closed Form", "Big-O"]}
        rows={[
          ["1 + 2 + ... + n", "n(n+1)/2", "O(n²)"],
          ["1 + 2 + 4 + ... + 2^k (k = log n)", "2n - 1", "O(n)"],
          ["1 + 1/2 + 1/4 + ...", "≤ 2", "O(1)"],
          ["log 1 + log 2 + ... + log n", "log(n!) ≈ n log n", "O(n log n)"],
        ]}
      />
    </div>
  ),

  insertion: () => (
    <div>
      <H2>🔢 Insertion Sort</H2>
      <P>Insertion sort builds a sorted subarray one element at a time by taking each new element and inserting it into its correct position among the already-sorted elements to its left.</P>

      <H3>The Mental Model</H3>
      <Callout color="#f59e0b">
        Think of sorting a hand of playing cards. You pick up cards one by one. Each new card gets inserted into the right place among the cards you're already holding.
      </Callout>

      <H3>Algorithm</H3>
      <Code>{`InsertionSort(A, n):
  for i = 1 to n-1:                    // outer: pick next card
    key = A[i]                         // card to insert
    j = i - 1
    while j >= 0 and A[j] > key:       // shift larger elements right
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key                       // insert into correct position`}</Code>

      <H3>Worked Example</H3>
      <Table
        headers={["Step (i)", "Array State", "Action"]}
        rows={[
          ["Start", "[5, 3, 8, 1, 2]", "—"],
          ["i=1, key=3", "[3, 5, 8, 1, 2]", "3 < 5, shift 5 right, insert 3"],
          ["i=2, key=8", "[3, 5, 8, 1, 2]", "8 > 5, no shift needed"],
          ["i=3, key=1", "[1, 3, 5, 8, 2]", "1 < 8,5,3, shift all right"],
          ["i=4, key=2", "[1, 2, 3, 5, 8]", "2 < 8,5,3, shift those right"],
        ]}
      />

      <H3>Complexity Analysis</H3>
      <Block>
        <P><strong style={{color:"#f87171"}}>Worst Case — O(n²):</strong> Array is reverse-sorted. At step <Math>i</Math>, the while loop runs <Math>i</Math> times. Total comparisons:</P>
        <MathBlock>1 + 2 + 3 + ... + (n-1) = n(n-1)/2 = Θ(n²)</MathBlock>

        <P><strong style={{color:"#4ade80"}}>Best Case — O(n):</strong> Array is already sorted. The while loop never executes. Outer loop runs <Math>n-1</Math> times with O(1) work each → <Math>O(n)</Math></P>

        <P><strong style={{color:"#fb923c"}}>Average Case — O(n²):</strong> On average, each element is compared to half the sorted subarray → still <Math>Θ(n²)</Math></P>
      </Block>

      <Table
        headers={["Case", "Time", "Space", "Stable?"]}
        rows={[
          ["Best (sorted)", "O(n)", "O(1)", "✅ Yes"],
          ["Average", "O(n²)", "O(1)", "✅ Yes"],
          ["Worst (reversed)", "O(n²)", "O(1)", "✅ Yes"],
        ]}
      />

      <Callout title="When to use" color="#6366f1">
        Insertion sort is practical for small arrays (n ≤ ~30) and nearly-sorted data. Many production sort implementations (like Python's Timsort) use insertion sort as a subroutine for small subarrays.
      </Callout>
    </div>
  ),

  selection: () => (
    <div>
      <H2>🔍 Selection Sort</H2>
      <P>Selection sort repeatedly finds the minimum element from the unsorted portion and swaps it to the front. At each step, the sorted region grows by one.</P>

      <H3>The Mental Model</H3>
      <Callout color="#f59e0b">
        Imagine lining up students by height. You scan the whole line, find the shortest person, and put them first. Then scan the remainder, find the next shortest, put them second. Repeat.
      </Callout>

      <H3>Algorithm</H3>
      <Code>{`SelectionSort(A, n):
  for i = 0 to n-2:                        // outer: position to fill
    min_idx = i
    for j = i+1 to n-1:                   // inner: find min in rest
      if A[j] < A[min_idx]:
        min_idx = j
    swap(A[i], A[min_idx])                 // place min at position i`}</Code>

      <H3>Worked Example</H3>
      <Table
        headers={["Step (i)", "Array State", "Min Found", "After Swap"]}
        rows={[
          ["i=0", "[5, 3, 8, 1, 2]", "A[3]=1", "[1, 3, 8, 5, 2]"],
          ["i=1", "[1, 3, 8, 5, 2]", "A[4]=2", "[1, 2, 8, 5, 3]"],
          ["i=2", "[1, 2, 8, 5, 3]", "A[4]=3", "[1, 2, 3, 5, 8]"],
          ["i=3", "[1, 2, 3, 5, 8]", "A[3]=5", "[1, 2, 3, 5, 8]"],
        ]}
      />

      <H3>Complexity Analysis</H3>
      <Block>
        <P>The inner loop at step <Math>i</Math> always runs <Math>n-1-i</Math> times regardless of input order. Total comparisons:</P>
        <MathBlock>(n-1) + (n-2) + ... + 1 = n(n-1)/2 = Θ(n²)</MathBlock>
        <P>Unlike insertion sort, best and worst case are <strong>both Θ(n²)</strong> — selection sort cannot benefit from a nearly-sorted array.</P>
      </Block>

      <Table
        headers={["Case", "Comparisons", "Swaps", "Stable?"]}
        rows={[
          ["Best", "O(n²)", "O(n)", "❌ No"],
          ["Average", "O(n²)", "O(n)", "❌ No"],
          ["Worst", "O(n²)", "O(n)", "❌ No"],
        ]}
      />

      <H3>Insertion vs Selection — Side by Side</H3>
      <Table
        headers={["Property", "Insertion Sort", "Selection Sort"]}
        rows={[
          ["Strategy", "Insert into sorted prefix", "Select min from unsorted suffix"],
          ["Comparisons (worst)", "n²/2", "n²/2 (always)"],
          ["Swaps (worst)", "O(n²)", "O(n) — at most n-1 swaps!"],
          ["Adaptive?", "✅ Yes — O(n) if sorted", "❌ No — always Θ(n²)"],
          ["Stable?", "✅ Yes", "❌ No"],
          ["When better", "Nearly sorted data", "Minimizing writes (slow memory)"],
        ]}
      />
    </div>
  ),

  master: () => (
    <div>
      <H2>📜 The Master Theorem</H2>
      <P>The Master Theorem gives a closed-form solution to recurrences of the form:</P>
      <MathBlock>T(n) = a·T(n/b) + f(n)</MathBlock>

      <Block>
        <P>where:</P>
        <P>• <Math>a ≥ 1</Math> = number of subproblems</P>
        <P>• <Math>b > 1</Math> = factor by which input shrinks</P>
        <P>• <Math>f(n)</Math> = cost of dividing + combining (the non-recursive work)</P>
        <P>• <Math>n^(log_b a)</Math> = the "critical exponent" — the natural growth of recursive work</P>
      </Block>

      <H3>The Three Cases</H3>

      <Callout title="Case 1 — Recursion Dominates" color="#f87171">
        <strong>Condition:</strong> f(n) = O(n^(log_b(a) − ε)) for some ε &gt; 0 (f grows strictly slower than n^log_b(a))<br/>
        <strong>Result:</strong> T(n) = Θ(n^log_b(a))<br/>
        <strong>Intuition:</strong> Most work happens at the leaves of the recursion tree.
      </Callout>

      <Callout title="Case 2 — Tie" color="#f59e0b">
        <strong>Condition:</strong> f(n) = Θ(n^log_b(a)) (f and recursive work grow at the same rate)<br/>
        <strong>Result:</strong> T(n) = Θ(n^log_b(a) · log n)<br/>
        <strong>Intuition:</strong> Work is evenly spread across all log n levels of the recursion tree.
      </Callout>

      <Callout title="Case 3 — Combining Dominates" color="#4ade80">
        <strong>Condition:</strong> f(n) = Ω(n^(log_b(a) + ε)) AND regularity condition a·f(n/b) ≤ c·f(n)<br/>
        <strong>Result:</strong> T(n) = Θ(f(n))<br/>
        <strong>Intuition:</strong> Most work happens at the root — the combine step dominates.
      </Callout>

      <H3>Step-by-Step Method</H3>
      <Code>{`1. Identify a, b, f(n) from the recurrence
2. Compute the critical exponent: log_b(a)
3. Compare f(n) vs n^(log_b(a)):
   - f grows SLOWER  → Case 1 → Θ(n^log_b(a))
   - f grows THE SAME → Case 2 → Θ(n^log_b(a) · log n)
   - f grows FASTER  → Case 3 → Θ(f(n))`}</Code>

      <H3>Classic Examples</H3>
      <Table
        headers={["Algorithm", "Recurrence", "a", "b", "f(n)", "n^log_b(a)", "Case", "Result"]}
        rows={[
          ["Binary Search", "T(n)=T(n/2)+O(1)", "1", "2", "1", "n⁰=1", "Case 2", "Θ(log n)"],
          ["Merge Sort", "T(n)=2T(n/2)+O(n)", "2", "2", "n", "n¹=n", "Case 2", "Θ(n log n)"],
          ["Strassen", "T(n)=7T(n/2)+O(n²)", "7", "2", "n²", "n^2.81", "Case 1", "Θ(n^2.81)"],
          ["Karatsuba", "T(n)=3T(n/2)+O(n)", "3", "2", "n", "n^1.58", "Case 1", "Θ(n^1.58)"],
          ["Naive Matrix", "T(n)=8T(n/2)+O(n²)", "8", "2", "n²", "n³", "Case 1", "Θ(n³)"],
          ["FFT", "T(n)=2T(n/2)+O(n)", "2", "2", "n", "n¹=n", "Case 2", "Θ(n log n)"],
        ]}
      />

      <Callout title="Master Theorem Limitation" color="#94a3b8">
        The Master Theorem only applies when subproblems are equal size. Recurrences like T(n) = T(n/3) + T(2n/3) + n (used in some quicksort analyses) require other methods like the recursion tree method.
      </Callout>
    </div>
  ),

  mergesort: () => (
    <div>
      <H2>✂️ Merge Sort</H2>
      <P>Merge sort is the archetypal divide-and-conquer sorting algorithm. It recursively splits the array in half, sorts each half, then merges the sorted halves back together.</P>

      <H3>The Three Steps</H3>
      <Block>
        <P><strong style={{color:"#7dd3fc"}}>Divide:</strong> Split array into two halves of size n/2. O(1) work.</P>
        <P><strong style={{color:"#7dd3fc"}}>Conquer:</strong> Recursively sort each half. 2 subproblems.</P>
        <P><strong style={{color:"#7dd3fc"}}>Combine:</strong> Merge two sorted halves into one sorted array. O(n) work.</P>
      </Block>

      <H3>Algorithm</H3>
      <Code>{`MergeSort(A, left, right):
  if left >= right: return              // base case: 1 element

  mid = (left + right) / 2
  MergeSort(A, left, mid)               // sort left half
  MergeSort(A, mid+1, right)            // sort right half
  Merge(A, left, mid, right)            // combine

Merge(A, left, mid, right):
  // Two-pointer merge of A[left..mid] and A[mid+1..right]
  L = A[left..mid],  R = A[mid+1..right]
  i = 0, j = 0, k = left

  while i < len(L) and j < len(R):
    if L[i] <= R[j]: A[k++] = L[i++]
    else:            A[k++] = R[j++]

  copy remaining elements of L or R into A`}</Code>

      <H3>Recursion Tree Visualization</H3>
      <Code>{`                    [5,3,8,1,2,7,4,6]           — n work to merge
                   /                  \
          [5,3,8,1]                [2,7,4,6]          — n work total
          /      \                 /      \
       [5,3]    [8,1]           [2,7]    [4,6]        — n work total
       /  \     /  \            /  \     /  \
     [5] [3] [8] [1]         [2] [7] [4] [6]         — n work total

         log₂n = 3 levels, each level does O(n) work
                  → Total: O(n log n)`}</Code>

      <H3>Complexity</H3>
      <MathBlock>T(n) = 2T(n/2) + O(n)</MathBlock>
      <P>By Master Theorem: a=2, b=2, f(n)=n, n^(log₂2) = n¹ = n → Case 2 → <strong style={{color:"#4ade80"}}>Θ(n log n)</strong></P>

      <Table
        headers={["Case", "Time", "Space", "Stable?"]}
        rows={[
          ["Best", "Θ(n log n)", "O(n)", "✅ Yes"],
          ["Average", "Θ(n log n)", "O(n)", "✅ Yes"],
          ["Worst", "Θ(n log n)", "O(n)", "✅ Yes"],
        ]}
      />

      <Callout title="Key Insight" color="#6366f1">
        Merge sort is optimal for comparison-based sorting — any comparison sort requires Ω(n log n) comparisons in the worst case (information-theoretic lower bound). Merge sort achieves this bound.
      </Callout>

      <Callout title="Trade-off" color="#f59e0b">
        Unlike insertion sort, merge sort is NOT in-place. The merge step requires O(n) extra space. This makes it less cache-friendly and rules it out for memory-constrained environments.
      </Callout>
    </div>
  ),

  karatsuba: () => (
    <div>
      <H2>✖️ Karatsuba's Algorithm</H2>
      <P>Karatsuba's algorithm multiplies two n-digit numbers faster than the grade-school O(n²) method, using a clever algebraic identity to reduce the number of recursive multiplications from 4 to 3.</P>

      <H3>The Problem</H3>
      <P>Multiplying two n-digit numbers naively: align and multiply each pair of digits → <Math>n²</Math> single-digit multiplications → <Math>O(n²)</Math>.</P>

      <H3>The Divide Step</H3>
      <P>Split each n-digit number at the midpoint. For x and y with n digits:</P>
      <MathBlock>x = x₁ · 10^(n/2) + x₀</MathBlock>
      <MathBlock>y = y₁ · 10^(n/2) + y₀</MathBlock>

      <P>Then:</P>
      <MathBlock>x · y = x₁y₁ · 10^n + (x₁y₀ + x₀y₁) · 10^(n/2) + x₀y₀</MathBlock>

      <H3>The Naive Divide-and-Conquer (Still O(n²))</H3>
      <P>Computing the four products x₁y₁, x₁y₀, x₀y₁, x₀y₀ recursively gives:</P>
      <MathBlock>T(n) = 4T(n/2) + O(n)</MathBlock>
      <P>Master Theorem: a=4, b=2, n^(log₂4) = n² → <strong style={{color:"#f87171"}}>T(n) = Θ(n²)</strong> — no improvement!</P>

      <H3>Karatsuba's Key Trick</H3>
      <P>Notice that the cross term <Math>x₁y₀ + x₀y₁</Math> can be computed with just ONE multiplication:</P>
      <MathBlock>x₁y₀ + x₀y₁ = (x₁+x₀)(y₁+y₀) − x₁y₁ − x₀y₀</MathBlock>

      <Block color="#0f2a1a">
        <P style={{color:"#4ade80"}}>Only 3 recursive multiplications needed:</P>
        <P>• <Math>p₁ = x₁ · y₁</Math></P>
        <P>• <Math>p₂ = x₀ · y₀</Math></P>
        <P>• <Math>p₃ = (x₁+x₀) · (y₁+y₀)</Math></P>
        <P>• Cross term = <Math>p₃ - p₁ - p₂</Math>  ← just additions, O(n)</P>
        <P>• Result = <Math>p₁·10ⁿ + (p₃-p₁-p₂)·10^(n/2) + p₂</Math></P>
      </Block>

      <H3>Algorithm</H3>
      <Code>{`Karatsuba(x, y, n):
  if n == 1: return x * y               // base case

  x₁, x₀ = split(x, n/2)              // high, low halves
  y₁, y₀ = split(y, n/2)

  p1 = Karatsuba(x₁, y₁, n/2)         // recurse 1
  p2 = Karatsuba(x₀, y₀, n/2)         // recurse 2
  p3 = Karatsuba(x₁+x₀, y₁+y₀, n/2)  // recurse 3

  return p1*10^n + (p3-p1-p2)*10^(n/2) + p2`}</Code>

      <H3>Complexity</H3>
      <MathBlock>T(n) = 3T(n/2) + O(n)</MathBlock>
      <P>Master Theorem: a=3, b=2, f(n)=n, n^(log₂3) ≈ n^1.585</P>
      <P>n^1.585 grows faster than n → Case 1 → <strong style={{color:"#4ade80"}}>T(n) = Θ(n^1.585)</strong></P>

      <Table
        headers={["Algorithm", "Recurrence", "Complexity", "Subproblems"]}
        rows={[
          ["Naive", "4T(n/2) + O(n)", "O(n²)", "4 multiplications"],
          ["Karatsuba", "3T(n/2) + O(n)", "O(n^1.585)", "3 multiplications"],
        ]}
      />

      <Callout title="The Lesson" color="#6366f1">
        Saving just one recursive call — from 4 to 3 — changed the exponent from 2 to 1.585. This is the power of divide-and-conquer: reducing the number of subproblems can dramatically improve complexity, even if the combine step stays the same.
      </Callout>
    </div>
  ),

  strassen: () => (
    <div>
      <H2>🔲 Strassen's Matrix Multiplication</H2>
      <P>Strassen's algorithm multiplies two n×n matrices faster than the standard O(n³) algorithm, by reducing the number of recursive matrix multiplications from 8 to 7 — analogous to Karatsuba for integers.</P>

      <H3>Standard Matrix Multiplication</H3>
      <P>For C = A × B where A, B are n×n:</P>
      <MathBlock>C[i][j] = Σₖ A[i][k] · B[k][j]</MathBlock>
      <P>Three nested loops → <Math>n³</Math> multiplications → <Math>O(n³)</Math>.</P>

      <H3>Divide-and-Conquer Setup</H3>
      <P>Partition each n×n matrix into four n/2 × n/2 submatrices:</P>
      <Code>{`A = | A₁₁  A₁₂ |    B = | B₁₁  B₁₂ |    C = | C₁₁  C₁₂ |
    | A₂₁  A₂₂ |        | B₂₁  B₂₂ |        | C₂₁  C₂₂ |`}</Code>

      <P>Standard block multiplication requires 8 recursive multiplications:</P>
      <Code>{`C₁₁ = A₁₁B₁₁ + A₁₂B₂₁
C₁₂ = A₁₁B₁₂ + A₁₂B₂₂
C₂₁ = A₂₁B₁₁ + A₂₂B₂₁
C₂₂ = A₂₁B₁₂ + A₂₂B₂₂
→ T(n) = 8T(n/2) + O(n²) = O(n³)    ← still cubic!`}</Code>

      <H3>Strassen's 7 Products</H3>
      <Block color="#0f2a1a">
        <P style={{color:"#4ade80"}}>Strassen computes only 7 products (with additions/subtractions to compose them):</P>
        <Code>{`M₁ = (A₁₁ + A₂₂)(B₁₁ + B₂₂)
M₂ = (A₂₁ + A₂₂) B₁₁
M₃ = A₁₁ (B₁₂ − B₂₂)
M₄ = A₂₂ (B₂₁ − B₁₁)
M₅ = (A₁₁ + A₁₂) B₂₂
M₆ = (A₂₁ − A₁₁)(B₁₁ + B₁₂)
M₇ = (A₁₂ − A₂₂)(B₂₁ + B₂₂)`}</Code>
        <P>Then reconstruct C:</P>
        <Code>{`C₁₁ = M₁ + M₄ − M₅ + M₇
C₁₂ = M₃ + M₅
C₂₁ = M₂ + M₄
C₂₂ = M₁ − M₂ + M₃ + M₆`}</Code>
      </Block>

      <H3>Complexity</H3>
      <MathBlock>T(n) = 7T(n/2) + O(n²)</MathBlock>
      <P>Master Theorem: a=7, b=2, f(n)=n², n^(log₂7) ≈ n^2.807</P>
      <P>n^2.807 grows faster than n² → Case 1 → <strong style={{color:"#4ade80"}}>T(n) = Θ(n^log₂7) ≈ Θ(n^2.807)</strong></P>

      <Table
        headers={["Algorithm", "Multiplications", "Recurrence", "Complexity"]}
        rows={[
          ["Naive", "n³", "—", "O(n³)"],
          ["Block D&C", "8 recursive", "8T(n/2)+O(n²)", "O(n³)"],
          ["Strassen", "7 recursive", "7T(n/2)+O(n²)", "O(n^2.807)"],
          ["Best known (2024)", "~5 recursive (approx.)", "—", "O(n^2.371...)"],
        ]}
      />

      <Callout title="Practical Note" color="#f59e0b">
        Strassen has large constant factors and poor cache behavior. In practice it's only faster than the naive algorithm for very large matrices (n ~ 1000+). Most numerical libraries use Strassen or its variants only as building blocks with heavy optimization.
      </Callout>
    </div>
  ),

  polymult: () => (
    <div>
      <H2>🧮 Polynomial Multiplication</H2>
      <P>Multiplying two polynomials is the core operation that motivates FFT. It also generalizes integer multiplication — a degree-n polynomial is like an n-digit number in disguise.</P>

      <H3>What Is a Polynomial?</H3>
      <MathBlock>A(x) = a₀ + a₁x + a₂x² + ... + aₙ₋₁xⁿ⁻¹</MathBlock>
      <P>Represented as coefficient array: <Math>A = [a₀, a₁, ..., aₙ₋₁]</Math></P>

      <H3>Multiplication — The Convolution</H3>
      <P>For C = A · B where A has degree d₁ and B has degree d₂:</P>
      <MathBlock>C[k] = Σᵢ₊ⱼ₌ₖ A[i] · B[j]</MathBlock>
      <P>The result has degree d₁ + d₂ and n₁ + n₂ - 1 coefficients.</P>

      <H3>Concrete Example</H3>
      <Code>{`A(x) = 3 + 5x + 2x²       →  A = [3, 5, 2]
B(x) = 1 + 4x             →  B = [1, 4]

C[0] = A[0]·B[0]              = 3·1        = 3
C[1] = A[0]·B[1] + A[1]·B[0] = 3·4 + 5·1 = 17
C[2] = A[1]·B[1] + A[2]·B[0] = 5·4 + 2·1 = 22
C[3] = A[2]·B[1]              = 2·4        = 8

C(x) = 3 + 17x + 22x² + 8x³  →  C = [3, 17, 22, 8]`}</Code>

      <H3>Two Representations of Polynomials</H3>
      <P>A degree-(n-1) polynomial is <em>uniquely determined</em> by n points. This is the key mathematical fact that makes point-value representation work.</P>
      <Table
        headers={["Representation", "Storage", "Evaluate at x", "Add two polys", "Multiply two polys"]}
        rows={[
          ["Coefficient form", "[a₀, a₁, ..., aₙ₋₁]", "O(n) via Horner", "O(n)", "O(n²) naive"],
          ["Point-value form", "n pairs {(xᵢ, yᵢ)}", "O(1) at stored pts", "O(n) pointwise", "O(n) pointwise!"],
        ]}
      />

      <H3>Point-Value Form — Deep Dive</H3>
      <Block>
        <P><strong style={{color:"#7dd3fc"}}>What it is:</strong> Instead of storing coefficients, store n (x, y) pairs where y = A(x). Example:</P>
        <Code>{`A(x) = 3 + 5x + 2x²  (degree 2, need 3 points to pin it down)

Coefficient form: [3, 5, 2]
Point-value form: {(0, 3), (1, 10), (2, 21)}
  because A(0)=3, A(1)=3+5+2=10, A(2)=3+10+8=21`}</Code>

        <P><strong style={{color:"#7dd3fc"}}>Why multiplication is O(n):</strong> If you have point-value forms of A and B at the <em>same</em> x-points, C = A·B is just:</P>
        <Code>{`C(xᵢ) = A(xᵢ) · B(xᵢ)   for each i

Example: A = {(0,3),(1,10),(2,21)},  B = {(0,1),(1,5),(2,9)}
  C = {(0, 3·1), (1, 10·5), (2, 21·9)}
    = {(0, 3),   (1, 50),   (2, 189)}   ← done in O(n)!`}</Code>

        <P><strong style={{color:"#7dd3fc"}}>The catch:</strong> Multiplying degree-(n-1) polynomials gives a degree-(2n-2) result. You need <em>2n-1</em> points in point-value form to represent it — so you must start with 2n points, not n. That's why FFT pads to size 2n.</P>
      </Block>

      <H3>The Conversion Problem</H3>
      <Table
        headers={["Conversion", "What it does", "Naive cost", "FFT cost"]}
        rows={[
          ["Coeff → Point-value", "Evaluate poly at n chosen x-points", "O(n²)", "O(n log n) using roots of unity"],
          ["Point-value → Coeff", "Recover polynomial from n points (interpolation)", "O(n²)", "O(n log n) using inverse FFT"],
        ]}
      />

      <Callout title="The Key Insight for FFT" color="#6366f1">
        In point-value form, multiplication is O(n). The bottleneck is converting between representations. FFT cuts this from O(n²) to O(n log n) by choosing evaluation points cleverly — the n-th roots of unity — whose structure allows the divide-and-conquer recursion.
      </Callout>

      <H3>The FFT-Based Multiplication Pipeline</H3>
      <Code>{`Input: coefficient arrays A = [a₀,...,aₙ], B = [b₀,...,bₙ]

Step 1: Pad both to size 2n (to avoid aliasing)                O(n)
Step 2: FFT(A) → point-values of A at 2n roots of unity        O(n log n)
Step 3: FFT(B) → point-values of B at 2n roots of unity        O(n log n)
Step 4: Pointwise multiply: C[k] = A[k] * B[k]                O(n)
Step 5: Inverse FFT(C) → coefficient form of product           O(n log n)

Total: O(n log n)`}</Code>

      <H3>Naive vs FFT Multiplication</H3>
      <Table
        headers={["Method", "Complexity", "For n = 10⁶"]}
        rows={[
          ["Naive (double loop)", "O(n²)", "10¹² operations"],
          ["Karatsuba", "O(n^1.58)", "~10⁹ operations"],
          ["FFT-based", "O(n log n)", "~2×10⁷ operations"],
        ]}
      />
    </div>
  ),

  roots: () => (
    <div>
      <H2>⭕ Roots of Unity</H2>
      <P>The n-th roots of unity are the n complex numbers that satisfy <Math>z^n = 1</Math>. They form a perfect symmetric structure that FFT exploits completely.</P>

      <H3>Definition</H3>
      <MathBlock>ωₙ = e^(2πi/n) = cos(2π/n) + i·sin(2π/n)</MathBlock>
      <P>The n roots of unity are: <Math>ωₙ⁰, ωₙ¹, ωₙ², ..., ωₙⁿ⁻¹</Math></P>

      <H3>Visual Intuition</H3>
      <P>They are n equally-spaced points on the unit circle in the complex plane:</P>
      <Code>{`  n=4:   1, i, -1, -i       (at 0°, 90°, 180°, 270°)
  n=8:   1, e^(iπ/4), i, ...  (at 0°, 45°, 90°, ...)
  n=2:   1, -1               (at 0°, 180°)`}</Code>

      <H3>The Four Critical Properties</H3>

      <Callout title="1. Cancellation" color="#6366f1">
        <strong>ωₙⁿ = 1</strong>, so ωₙⁿ⁺ᵏ = ωₙᵏ — the powers cycle with period n.
      </Callout>

      <Callout title="2. Halving (The key to FFT recursion)" color="#f59e0b">
        <strong>(ωₙᵏ)² = ωₙ/₂ᵏ</strong> — squaring the n-th roots gives the n/2-th roots.<br/>
        This means the even-indexed roots of unity of size n are exactly the roots of unity of size n/2.
      </Callout>

      <Callout title="3. Negation" color="#4ade80">
        <strong>ωₙᵏ⁺ⁿ/² = −ωₙᵏ</strong> — roots in the second half are negatives of roots in the first half.<br/>
        This gives FFT the "for free" second half: y[k + n/2] = y_even[k] − w·y_odd[k]
      </Callout>

      <Callout title="4. Orthogonality (enables inverse FFT)" color="#f87171">
        The matrix of roots of unity is "almost unitary" — its inverse is itself divided by n. This means DFT and inverse DFT have the same structure, and inverse FFT is also O(n log n).
      </Callout>

      <H3>Why Roots of Unity — Not Arbitrary Points?</H3>
      <P>If you evaluate a polynomial at n <em>arbitrary</em> points, you can't reuse computations across recursive calls. But roots of unity have the halving property: the squares of the n roots are exactly the n/2 roots. This means:</P>
      <Block>
        <P>Evaluating at n roots of unity → two subproblems evaluating at n/2 roots of unity → ... → log n levels of recursion, each O(n) work → <strong style={{color:"#4ade80"}}>O(n log n) total</strong></P>
      </Block>

      <H3>Euler's Formula Connection</H3>
      <MathBlock>e^(iθ) = cos(θ) + i·sin(θ)</MathBlock>
      <P>Setting θ = 2πk/n places the k-th root at angle 2πk/n on the unit circle. This is why FFT is deeply connected to frequency analysis in signals — rotating around the unit circle corresponds to oscillating at different frequencies.</P>
    </div>
  ),

  fft: () => (
    <div>
      <H2>🌊 Fast Fourier Transform (FFT)</H2>
      <P>FFT computes the Discrete Fourier Transform (DFT) in O(n log n) instead of O(n²), by applying divide-and-conquer to exploit the structure of roots of unity.</P>

      <H3>The DFT — What We're Computing</H3>
      <MathBlock>A[k] = Σⱼ₌₀ⁿ⁻¹ a[j] · ωₙʲᵏ</MathBlock>
      <P>This evaluates polynomial <Math>a(x) = a₀ + a₁x + ... + aₙ₋₁xⁿ⁻¹</Math> at all n-th roots of unity simultaneously. Naively: n outputs × n terms each = <Math>O(n²)</Math>.</P>

      <H3>The Divide-and-Conquer Split</H3>
      <P>Split the polynomial by even/odd coefficient indices:</P>
      <Code>{`A(x) = a₀ + a₁x + a₂x² + a₃x³ + a₄x⁴ + ...

A_even(x) = a₀ + a₂x + a₄x²  + ...    (even-indexed coefficients)
A_odd(x)  = a₁ + a₃x + a₅x²  + ...    (odd-indexed coefficients)

Then: A(x) = A_even(x²) + x · A_odd(x²)`}</Code>

      <H3>The Recursive Formula</H3>
      <P>Evaluate at ωₙᵏ (the k-th root of unity):</P>
      <MathBlock>A(ωₙᵏ) = A_even(ωₙ²ᵏ) + ωₙᵏ · A_odd(ωₙ²ᵏ)</MathBlock>
      <P>Using the halving property ωₙ²ᵏ = ωₙ/₂ᵏ:</P>
      <MathBlock>A(ωₙᵏ) = A_even(ωₙ/₂ᵏ) + ωₙᵏ · A_odd(ωₙ/₂ᵏ)</MathBlock>
      <P>This means: compute FFT of A_even and A_odd (each size n/2), then combine in O(n).</P>

      <H3>The "Butterfly" Combine Step</H3>
      <Code>{`For k = 0 to n/2 - 1:
  w = ωₙᵏ                              // "twiddle factor"
  y[k]       = y_even[k] + w * y_odd[k]
  y[k + n/2] = y_even[k] - w * y_odd[k]   // FREE via negation property!`}</Code>
      <P>Each pair <Math>(k, k+n/2)</Math> is called a "butterfly." The negation property means we compute both entries from the same w · y_odd[k] — halving the multiplications.</P>

      <H3>Full Algorithm</H3>
      <Code>{`FFT(a):                          // a = coefficient array, n = len(a)
  n = len(a)
  if n == 1: return a            // base case

  a_even = [a[0], a[2], a[4], ...]   // even-indexed coefficients
  a_odd  = [a[1], a[3], a[5], ...]   // odd-indexed coefficients

  y_even = FFT(a_even)           // recurse: n/2 elements
  y_odd  = FFT(a_odd)            // recurse: n/2 elements

  y = array of size n
  for k = 0 to n/2 - 1:
    w = e^(2πi·k/n)              // ωₙᵏ
    y[k]       = y_even[k] + w * y_odd[k]
    y[k + n/2] = y_even[k] - w * y_odd[k]

  return y`}</Code>

      <H3>Recurrence and Complexity</H3>
      <MathBlock>T(n) = 2T(n/2) + O(n)</MathBlock>
      <P>Master Theorem: a=2, b=2, f(n)=n, n^log₂2 = n → Case 2 → <strong style={{color:"#4ade80"}}>Θ(n log n)</strong></P>

      <H3>The Full Picture — Everything Connected</H3>
      <Table
        headers={["Problem", "Naive", "Smart Algorithm", "Key Idea"]}
        rows={[
          ["Sorting", "O(n²)", "Merge Sort O(n log n)", "Divide at midpoint"],
          ["Integer Multiply", "O(n²)", "Karatsuba O(n^1.58)", "3 instead of 4 subproblems"],
          ["Matrix Multiply", "O(n³)", "Strassen O(n^2.81)", "7 instead of 8 subproblems"],
          ["Poly Multiply / DFT", "O(n²)", "FFT O(n log n)", "Roots of unity halving property"],
        ]}
      />

      <Callout title="Inverse FFT" color="#6366f1">
        The inverse DFT (recovering coefficients from values) has the same structure as FFT — just use conjugate roots ωₙ⁻ᵏ instead of ωₙᵏ, then divide by n. So inverse FFT is also O(n log n), making the full polynomial multiplication pipeline O(n log n).
      </Callout>

      <Callout title="Real-World Applications" color="#10b981">
        FFT is one of the most important algorithms ever discovered. It's used in: audio/image compression (MP3, JPEG), signal processing, solving PDEs, fast integer arithmetic (Python's big integers), wireless communications (OFDM in 4G/5G), and anywhere convolution appears.
      </Callout>
    </div>
  ),
};

export default function AlgorithmsGuide() {
  const [active, setActive] = useState("asymptotic");

  return (
    <div style={{ minHeight: "100vh", background: "#080f1a", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: "#0d1b2a", borderRight: "1px solid #1e3a5f", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1e3a5f", marginBottom: 12 }}>
          <div style={{ color: "#7dd3fc", fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>CSE 385</div>
          <div style={{ color: "#f8fafc", fontWeight: 700, fontSize: 16, marginTop: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>Algorithm Study Guide</div>
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
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto", maxWidth: 860 }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Fira+Mono&display=swap" rel="stylesheet" />
        {content[active]?.()}
      </div>
    </div>
  );
}
