import type { UploadKind } from "./uploads";

export interface UploadConfig {
  kind: UploadKind;
  button: string;
  titleLabel: string;
  titlePlaceholder: string;
  accept: string;
  fileRequired: boolean;
  withDetails: boolean;
  empty: string;
}

export const UPLOAD_CONFIGS: Record<UploadKind, UploadConfig> = {
  notice: {
    kind: "notice",
    button: "नई सूचना जोड़ें / Add notice",
    titleLabel: "सूचना का विषय / Title",
    titlePlaceholder: "जैसे: 26 जनवरी गणतंत्र दिवस कार्यक्रम",
    accept: "application/pdf,image/*",
    fileRequired: false,
    withDetails: true,
    empty: "अभी कोई सूचना नहीं है। / No notices yet.",
  },
  result: {
    kind: "result",
    button: "रिज़ल्ट अपलोड करें / Upload result",
    titleLabel: "रिज़ल्ट का नाम / Title",
    titlePlaceholder: "जैसे: कक्षा 10 बोर्ड परीक्षा परिणाम 2026",
    accept: "application/pdf,image/*,.xls,.xlsx,.csv",
    fileRequired: true,
    withDetails: true,
    empty: "अभी कोई रिज़ल्ट नहीं है। / No results yet.",
  },
  download: {
    kind: "download",
    button: "फ़ाइल अपलोड करें / Upload file",
    titleLabel: "फ़ाइल का नाम / Title",
    titlePlaceholder: "जैसे: एडमिशन फ़ॉर्म 2026-27",
    accept: "application/pdf,image/*,.doc,.docx,.xls,.xlsx",
    fileRequired: true,
    withDetails: false,
    empty: "अभी कोई फ़ाइल नहीं है। / No files yet.",
  },
  photo: {
    kind: "photo",
    button: "फ़ोटो अपलोड करें / Upload photo",
    titleLabel: "फ़ोटो का नाम / Caption",
    titlePlaceholder: "जैसे: वार्षिक खेल दिवस",
    accept: "image/*",
    fileRequired: true,
    withDetails: false,
    empty: "",
  },
};
