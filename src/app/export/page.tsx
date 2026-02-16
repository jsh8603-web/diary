"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { getEntriesInRange } from "@/lib/firebase/diary";
import { format } from "date-fns";

export default function ExportPage() {
  return (
    <AuthGuard>
      <ExportForm />
    </AuthGuard>
  );
}

function ExportForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleExport() {
    if (!startDate || !endDate) {
      setError("날짜 범위를 선택해주세요");
      return;
    }
    if (startDate > endDate) {
      setError("시작일이 종료일보다 늦습니다");
      return;
    }

    setError("");
    setGenerating(true);
    setProgress(0);

    try {
      const entries = await getEntriesInRange(startDate, endDate);
      if (entries.length === 0) {
        setError("해당 기간에 일기가 없습니다");
        setGenerating(false);
        return;
      }

      setProgress(10);

      // jsPDF 동적 import
      const { default: jsPDF } = await import("jspdf");

      // 한국어 폰트 로드 (NotoSansKR-Regular)
      setProgress(20);
      let fontLoaded = false;
      try {
        const fontResp = await fetch(
          "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLQ.ttf"
        );
        if (fontResp.ok) {
          const fontBuffer = await fontResp.arrayBuffer();
          // 큰 ArrayBuffer를 chunk 단위로 base64 변환 (스택 오버플로우 방지)
          const bytes = new Uint8Array(fontBuffer);
          let binary = "";
          const chunkSize = 8192;
          for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          const fontBase64 = btoa(binary);

          const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
          doc.addFileToVFS("NotoSansKR-Regular.ttf", fontBase64);
          doc.addFont("NotoSansKR-Regular.ttf", "NotoSansKR", "normal");
          doc.setFont("NotoSansKR");
          fontLoaded = true;
          await generatePDF(doc, entries, true);
        }
      } catch {
        // 폰트 로드 실패 시 기본 폰트로 fallback
      }

      if (!fontLoaded) {
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
        await generatePDF(doc, entries, false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "PDF 생성에 실패했습니다";
      setError(msg);
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  }

  async function generatePDF(
    doc: import("jspdf").jsPDF,
    entries: Awaited<ReturnType<typeof getEntriesInRange>>,
    hasKoreanFont: boolean
  ) {
    const pageW = 148;
    const pageH = 210;
    const margin = 15;
    const contentW = pageW - margin * 2;

    if (hasKoreanFont) {
      doc.setFont("NotoSansKR");
    }

    // 표지
    doc.setFillColor(245, 230, 224); // baby-pink
    doc.rect(0, 0, pageW, pageH, "F");
    doc.setFontSize(24);
    doc.setTextColor(157, 118, 88); // baby-taupe
    doc.text("우리 아기 일기", pageW / 2, pageH / 2 - 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(
      `${format(new Date(startDate), "yyyy.MM.dd")} - ${format(
        new Date(endDate),
        "yyyy.MM.dd"
      )}`,
      pageW / 2,
      pageH / 2 + 5,
      { align: "center" }
    );

    setProgress(30);

    // 일기 페이지들
    const totalEntries = entries.length;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      doc.addPage();

      // 사진이 있으면 사진 페이지
      if (entry.photos.length > 0) {
        for (let pi = 0; pi < entry.photos.length; pi++) {
          try {
            const img = await loadImageAsDataUrl(entry.photos[pi].url);
            const imgRatio = img.width / img.height;
            let imgW = contentW;
            let imgH = imgW / imgRatio;
            if (imgH > pageH - margin * 2 - 20) {
              imgH = pageH - margin * 2 - 20;
              imgW = imgH * imgRatio;
            }
            const imgX = (pageW - imgW) / 2;
            doc.addImage(img.dataUrl, "JPEG", imgX, margin, imgW, imgH);

            // 첫 사진 아래에만 날짜 표시
            if (pi === 0) {
              const textY = margin + imgH + 8;
              doc.setFontSize(9);
              doc.setTextColor(139, 115, 85);
              if (hasKoreanFont) doc.setFont("NotoSansKR");
              doc.text(
                format(new Date(entry.date), "yyyy.MM.dd"),
                pageW / 2,
                textY,
                { align: "center" }
              );
            }
          } catch {
            // 이미지 로드 실패 시 무시
          }
          // 다음 사진이 있거나 텍스트 페이지로 넘어갈 때 새 페이지
          if (pi < entry.photos.length - 1) {
            doc.addPage();
          }
        }
        doc.addPage();
      }

      // 텍스트 페이지
      doc.setFillColor(255, 248, 240); // baby-cream
      doc.rect(0, 0, pageW, pageH, "F");

      let y = margin;

      // 날짜
      doc.setFontSize(10);
      doc.setTextColor(139, 115, 85);
      doc.text(
        format(new Date(entry.date), "yyyy년 M월 d일"),
        margin,
        y
      );
      y += 8;

      // 제목
      if (entry.title) {
        doc.setFontSize(16);
        doc.setTextColor(157, 118, 88);
        const titleLines = doc.splitTextToSize(entry.title, contentW);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 7 + 4;
      }

      // 구분선
      doc.setDrawColor(232, 213, 196);
      doc.line(margin, y, pageW - margin, y);
      y += 6;

      // 본문
      doc.setFontSize(10);
      doc.setTextColor(74, 55, 40);
      const lines = doc.splitTextToSize(entry.content, contentW);
      const lineHeight = 5;

      for (const line of lines) {
        if (y + lineHeight > pageH - margin) {
          doc.addPage();
          doc.setFillColor(255, 248, 240);
          doc.rect(0, 0, pageW, pageH, "F");
          y = margin;
          if (hasKoreanFont) doc.setFont("NotoSansKR");
          doc.setFontSize(10);
          doc.setTextColor(74, 55, 40);
        }
        doc.text(line, margin, y);
        y += lineHeight;
      }

      setProgress(30 + Math.round((i / totalEntries) * 60));
    }

    setProgress(95);
    doc.save(`육아일기_${startDate}_${endDate}.pdf`);
    setProgress(100);
  }

  async function loadImageAsDataUrl(url: string): Promise<{ dataUrl: string; width: number; height: number }> {
    const resp = await fetch(url);
    const blob = await resp.blob();
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = dataUrl;
    });
    return { dataUrl, width, height };
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-2">
        PDF 내보내기
      </h1>
      <p className="text-baby-text-light text-sm mb-8">
        선택한 기간의 일기를 PDF로 내보냅니다 (A5 사이즈, 인쇄용)
      </p>

      <div className="bg-baby-white rounded-2xl p-6 border border-baby-border space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-baby-text-light mb-2">
              시작일
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream text-sm focus:outline-none focus:border-baby-taupe transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-baby-text-light mb-2">
              종료일
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream text-sm focus:outline-none focus:border-baby-taupe transition-colors"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {generating && (
          <div>
            <div className="flex justify-between text-xs text-baby-text-light mb-1">
              <span>PDF 생성 중...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-baby-cream rounded-full h-2">
              <div
                className="bg-baby-taupe h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleExport}
          disabled={generating}
          className="w-full bg-baby-taupe text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-baby-taupe-dark transition-colors disabled:opacity-50"
        >
          {generating ? "생성 중..." : "PDF 다운로드"}
        </button>
      </div>
    </div>
  );
}
