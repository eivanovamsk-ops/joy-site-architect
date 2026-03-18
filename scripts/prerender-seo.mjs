import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const seoSourcePath = path.join(rootDir, "src", "lib", "seo.ts");

const escapeAttr = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const ensureDistExists = async () => {
  try {
    await fs.access(distDir);
  } catch {
    throw new Error("Каталог dist не найден. Сначала выполните vite build.");
  }
};

const parseSeoMapFromSource = async () => {
  const source = await fs.readFile(seoSourcePath, "utf8");

  const siteUrlMatch = source.match(/const SITE_URL = "([^"]+)";/);
  if (!siteUrlMatch) throw new Error("Не удалось определить SITE_URL в src/lib/seo.ts");
  const siteUrl = siteUrlMatch[1];

  const defaultOgMatch = source.match(/const DEFAULT_OG_IMAGE = `\$\{SITE_URL\}([^`]+)`;/);
  const defaultOgImage = defaultOgMatch ? `${siteUrl}${defaultOgMatch[1]}` : `${siteUrl}/og-image.jpg`;

  const imageVarRegex = /const\s+(\w+)\s*=\s*`\$\{SITE_URL\}([^`]+)`;/g;
  const imageByVar = {};

  for (const match of source.matchAll(imageVarRegex)) {
    imageByVar[match[1]] = `${siteUrl}${match[2]}`;
  }

  const routeRegex = /"([^"]+)"\s*:\s*createSeo\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\w+)\s*,?\s*\)/gs;
  const seoByPath = {};

  for (const match of source.matchAll(routeRegex)) {
    const [_, routePath, canonicalPath, title, description, imageVarName] = match;
    seoByPath[routePath] = {
      title,
      description,
      canonical: `${siteUrl}${canonicalPath}`,
      ogImage: imageByVar[imageVarName] ?? defaultOgImage,
      ogType: "website",
      ogTitle: title,
      ogDescription: description,
    };
  }

  if (Object.keys(seoByPath).length === 0) {
    throw new Error("Не удалось распарсить SEO-карты маршрутов из src/lib/seo.ts");
  }

  return seoByPath;
};

const stripSeoTags = (html) => {
  const patterns = [
    /<title>[\s\S]*?<\/title>\s*/gi,
    /<meta\s+name=["']description["'][^>]*>\s*/gi,
    /<link\s+rel=["']canonical["'][^>]*>\s*/gi,
    /<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi,
  ];

  return patterns.reduce((acc, pattern) => acc.replace(pattern, ""), html);
};

const buildSeoBlock = (seo) => {
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;
  const ogType = seo.ogType ?? "website";

  return [
    `    <title>${escapeAttr(seo.title)}</title>`,
    `    <meta name=\"description\" content=\"${escapeAttr(seo.description)}\" />`,
    `    <link rel=\"canonical\" href=\"${escapeAttr(seo.canonical)}\" />`,
    "",
    `    <meta property=\"og:type\" content=\"${escapeAttr(ogType)}\" />`,
    `    <meta property=\"og:title\" content=\"${escapeAttr(ogTitle)}\" />`,
    `    <meta property=\"og:description\" content=\"${escapeAttr(ogDescription)}\" />`,
    `    <meta property=\"og:url\" content=\"${escapeAttr(seo.canonical)}\" />`,
    `    <meta property=\"og:image\" content=\"${escapeAttr(seo.ogImage)}\" />`,
    '    <meta property="og:site_name" content="Артикон" />',
    '    <meta property="og:locale" content="ru_RU" />',
    "",
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name=\"twitter:title\" content=\"${escapeAttr(ogTitle)}\" />`,
    `    <meta name=\"twitter:description\" content=\"${escapeAttr(ogDescription)}\" />`,
    `    <meta name=\"twitter:image\" content=\"${escapeAttr(seo.ogImage)}\" />`,
  ].join("\n");
};

const injectSeo = (html, seo) => {
  const cleanedHtml = stripSeoTags(html);
  const seoBlock = buildSeoBlock(seo);

  if (!cleanedHtml.includes("</head>")) {
    throw new Error("В dist/index.html не найден закрывающий тег </head>");
  }

  return cleanedHtml.replace("</head>", `${seoBlock}\n  </head>`);
};

const writeRouteHtml = async (routePath, html) => {
  const normalizedRoute = routePath === "/" ? "" : routePath.replace(/^\//, "");
  const outputFilePath = routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, normalizedRoute, "index.html");

  await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
  await fs.writeFile(outputFilePath, html, "utf8");
};

const run = async () => {
  await ensureDistExists();

  const [seoByPath, baseHtml] = await Promise.all([
    parseSeoMapFromSource(),
    fs.readFile(path.join(distDir, "index.html"), "utf8"),
  ]);

  const routes = Object.keys(seoByPath);

  await Promise.all(
    routes.map(async (routePath) => {
      const htmlWithSeo = injectSeo(baseHtml, seoByPath[routePath]);
      await writeRouteHtml(routePath, htmlWithSeo);
    }),
  );

  console.log(`[prerender-seo] Создано SEO HTML: ${routes.length} маршрутов`);
};

run().catch((error) => {
  console.error("[prerender-seo] Ошибка:", error);
  process.exit(1);
});
