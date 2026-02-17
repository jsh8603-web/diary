"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/Toast";
import { stickers, stickerCategories, type StickerDef } from "@/lib/stickers";

interface PlacedSticker {
  id: string;
  sticker: StickerDef;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface Props {
  imageUrl: string;
  onSave: (blob: Blob) => void;
  onCancel: () => void;
}

export default function PhotoEditor({ imageUrl, onSave, onCancel }: Props) {
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<PlacedSticker[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("botanical");
  const [dragging, setDragging] = useState<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  // ESC 키로 에디터 닫기 및 배경 스크롤 방지
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCancel();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  // 이미지 로드 시 사이즈 추적
  const imgRef = useRef<HTMLImageElement>(null);

  function handleImageLoad() {
    if (imgRef.current && containerRef.current) {
      setImgSize({
        w: imgRef.current.clientWidth,
        h: imgRef.current.clientHeight,
      });
    }
  }

  // 스티커 추가
  function addSticker(sticker: StickerDef) {
    const id = `${sticker.id}-${Date.now()}`;
    setPlaced((prev) => [
      ...prev,
      {
        id,
        sticker,
        x: imgSize.w / 2 - sticker.width / 2,
        y: imgSize.h / 2 - sticker.height / 2,
        scale: 1,
        rotation: 0,
      },
    ]);
    setSelectedId(id);
  }

  // 드래그 시작
  function handlePointerDown(e: React.PointerEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    const item = placed.find((p) => p.id === id);
    if (!item) return;
    setDragging({
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: item.x,
      origY: item.y,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    e.preventDefault();
    const dx = e.clientX - dragging.startX;
    const dy = e.clientY - dragging.startY;
    setPlaced((prev) =>
      prev.map((p) =>
        p.id === dragging.id
          ? { ...p, x: dragging.origX + dx, y: dragging.origY + dy }
          : p
      )
    );
  }

  function handlePointerUp() {
    setDragging(null);
  }

  // 크기 조절
  function adjustScale(delta: number) {
    if (!selectedId) return;
    setPlaced((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, scale: Math.max(0.3, Math.min(3, p.scale + delta)) }
          : p
      )
    );
  }

  // 회전
  function adjustRotation(delta: number) {
    if (!selectedId) return;
    setPlaced((prev) =>
      prev.map((p) =>
        p.id === selectedId ? { ...p, rotation: p.rotation + delta } : p
      )
    );
  }

  // 삭제
  function removeSelected() {
    if (!selectedId) return;
    setPlaced((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  }

  // 캔버스에 합성 후 저장
  async function handleSave() {
    setSaving(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      // 원본 이미지 로드
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageUrl;
      });

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // 표시 크기 대비 실제 크기 비율
      const scaleX = img.naturalWidth / imgSize.w;
      const scaleY = img.naturalHeight / imgSize.h;

      // 스티커 렌더링
      for (const p of placed) {
        const stickerImg = new Image();
        const svgBlob = new Blob([p.sticker.svg], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        await new Promise<void>((resolve, reject) => {
          stickerImg.onload = () => resolve();
          stickerImg.onerror = reject;
          stickerImg.src = svgUrl;
        });

        const sw = p.sticker.width * p.scale * scaleX;
        const sh = p.sticker.height * p.scale * scaleY;
        const sx = p.x * scaleX;
        const sy = p.y * scaleY;

        ctx.save();
        ctx.translate(sx + sw / 2, sy + sh / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.drawImage(stickerImg, -sw / 2, -sh / 2, sw, sh);
        ctx.restore();

        URL.revokeObjectURL(svgUrl);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) onSave(blob);
        },
        "image/jpeg",
        0.92
      );
    } catch (err) {
      console.error("이미지 저장 실패:", err);
      showToast("이미지 저장에 실패했습니다", "error");
    } finally {
      setSaving(false);
    }
  }

  const selected = placed.find((p) => p.id === selectedId);
  const filteredStickers = stickers.filter(
    (s) => s.category === activeCategory
  );

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col" role="dialog" aria-modal="true" aria-label="사진 꾸미기">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/50">
        <button
          onClick={onCancel}
          className="text-white text-sm px-3 py-1.5 rounded-lg bg-white/10"
        >
          취소
        </button>
        <span className="text-white text-sm font-medium">사진 꾸미기</span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-white text-sm px-3 py-1.5 rounded-lg bg-baby-taupe disabled:opacity-50"
        >
          {saving ? "저장중..." : "완료"}
        </button>
      </div>

      {/* 편집 영역 */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden p-2"
        onClick={() => setSelectedId(null)}
      >
        <div ref={containerRef} className="relative inline-block max-w-full max-h-full">
          <img
            ref={imgRef}
            src={imageUrl}
            alt=""
            onLoad={handleImageLoad}
            className="max-w-full max-h-[55vh] object-contain rounded-lg"
            draggable={false}
          />
          {/* 배치된 스티커 */}
          {placed.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: p.sticker.width * p.scale,
                height: p.sticker.height * p.scale,
                transform: `rotate(${p.rotation}deg)`,
                cursor: dragging?.id === p.id ? "grabbing" : "grab",
                outline:
                  selectedId === p.id
                    ? "2px dashed rgba(255,255,255,0.7)"
                    : "none",
                outlineOffset: "2px",
                touchAction: "none",
              }}
              onPointerDown={(e) => handlePointerDown(e, p.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onClick={(e) => e.stopPropagation()}
              dangerouslySetInnerHTML={{ __html: p.sticker.svg }}
            />
          ))}
        </div>
      </div>

      {/* 선택된 스티커 컨트롤 */}
      {selected && (
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-black/30">
          <button
            onClick={() => adjustScale(-0.15)}
            className="w-9 h-9 rounded-full bg-white/15 text-white text-lg flex items-center justify-center"
            aria-label="크기 줄이기"
          >
            −
          </button>
          <button
            onClick={() => adjustScale(0.15)}
            className="w-9 h-9 rounded-full bg-white/15 text-white text-lg flex items-center justify-center"
            aria-label="크기 키우기"
          >
            +
          </button>
          <div className="w-px h-6 bg-white/20" />
          <button
            onClick={() => adjustRotation(-15)}
            className="w-9 h-9 rounded-full bg-white/15 text-white text-xs flex items-center justify-center"
            aria-label="왼쪽으로 회전"
          >
            ↺
          </button>
          <button
            onClick={() => adjustRotation(15)}
            className="w-9 h-9 rounded-full bg-white/15 text-white text-xs flex items-center justify-center"
            aria-label="오른쪽으로 회전"
          >
            ↻
          </button>
          <div className="w-px h-6 bg-white/20" />
          <button
            onClick={removeSelected}
            className="w-9 h-9 rounded-full bg-red-500/40 text-white text-sm flex items-center justify-center"
            aria-label="스티커 삭제"
          >
            ✕
          </button>
        </div>
      )}

      {/* 스티커 팔레트 */}
      <div className="bg-baby-cream/95 rounded-t-2xl">
        {/* 카테고리 탭 */}
        <div className="flex gap-1 px-3 pt-3 pb-1">
          {stickerCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-baby-taupe text-white"
                  : "bg-baby-pink text-baby-taupe"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* 스티커 목록 */}
        <div className="flex gap-3 px-3 py-3 overflow-x-auto">
          {filteredStickers.map((s) => (
            <button
              key={s.id}
              onClick={() => addSticker(s)}
              className="flex-shrink-0 w-16 h-16 bg-white rounded-xl border border-baby-border p-1.5 flex items-center justify-center hover:border-baby-taupe transition-colors"
              title={s.name}
            >
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
