"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  lang: "en" | "id";
  englishLabel: string;
  indonesianLabel: string;
  initialLang: "en" | "id";
  onClose: () => void;
  onSave: (newLang: "en" | "id") => void;
};

export default function LanguageModal({
  open,
  lang,
  englishLabel,
  indonesianLabel,
  initialLang,
  onClose,
  onSave,
}: Props) {
  const [selected, setSelected] = useState<"en" | "id">(initialLang);

  useEffect(() => {
    if (open) setSelected(initialLang);
  }, [open, initialLang]);

  const t = useMemo(
    () => ({
      title: lang === "id" ? "Pilih Bahasa" : "Choose Language",
      cancel: lang === "id" ? "Batal" : "Cancel",
      save: lang === "id" ? "Simpan" : "Save",
    }),
    [lang]
  );

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onBackdrop}>
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
        <div className="mt-4 space-y-2">
          <button
            className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm ${
              selected === "en" ? "border-charcoal" : "border-gray-300"
            }`}
            onClick={() => setSelected("en")}
          >
            <span>🇬🇧 {englishLabel}</span>
            {selected === "en" && <span className="text-charcoal">✓</span>}
          </button>
          <button
            className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm ${
              selected === "id" ? "border-charcoal" : "border-gray-300"
            }`}
            onClick={() => setSelected("id")}
          >
            <span>🇮🇩 {indonesianLabel}</span>
            {selected === "id" && <span className="text-charcoal">✓</span>}
          </button>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            {t.cancel}
          </button>
          <button
            className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            onClick={() => {
              onSave(selected);
              onClose();
            }}
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}

