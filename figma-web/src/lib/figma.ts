export type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
};

export type FigmaDocument = {
  document: {
    children: Array<{
      id: string;
      name: string;
      type: string;
      children?: FigmaNode[];
    }>;
  };
};

export type ExtractedFrame = {
  id: string;
  name: string;
  pageName: string;
};

export function extractFileKeyFromUrl(input: string): string | null {
  if (!input) return null;
  // If they passed a naked key (26 char alphanumeric typically), accept it
  const nakedKeyMatch = input.match(/^[A-Za-z0-9]{20,}$/);
  if (nakedKeyMatch) return input;

  try {
    const url = new URL(input);
    if (!/figma\.com$/.test(url.hostname) && !/figma\.com$/.test(url.hostname.replace(/^www\./, ""))) {
      return null;
    }
    // Supported patterns: /file/<key>/..., /design/<key>/...
    const parts = url.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "file" || p === "design");
    if (idx >= 0 && parts[idx + 1]) {
      return parts[idx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

export function extractTopLevelFrames(file: FigmaDocument): ExtractedFrame[] {
  const result: ExtractedFrame[] = [];
  if (!file || !file.document || !Array.isArray(file.document.children)) {
    return result;
  }

  for (const page of file.document.children) {
    const pageName = page.name ?? "Page";
    const nodes = page.children ?? [];
    for (const node of nodes) {
      if (node.type === "FRAME" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
        result.push({ id: node.id, name: node.name, pageName });
      }
    }
  }

  return result;
}