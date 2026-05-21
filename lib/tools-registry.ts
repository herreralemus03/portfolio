export type CategoryId = "security" | "transform" | "network" | "devtools" | "generators" | "text";

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  icon: string;
  tags: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "security",   label: "Security",        icon: "🔒", color: "#FF9900" },
  { id: "transform",  label: "Data Transform",  icon: "🔄", color: "#7AA116" },
  { id: "network",    label: "Web & Network",   icon: "🌐", color: "#E7157B" },
  { id: "devtools",   label: "Developer Tools", icon: "⚙️", color: "#527FFF" },
  { id: "generators", label: "Generators",      icon: "📦", color: "#8C4FFF" },
  { id: "text",       label: "Text Tools",      icon: "📋", color: "#29ABE2" },
];

export const TOOLS: ToolMeta[] = [
  // ── Security ──────────────────────────────────────────────────
  { id: "rsa",       category: "security",   icon: "🔑", name: "RSA Encrypt/Decrypt",  description: "Genera pares de claves, cifra y descifra con RSA-OAEP",         tags: ["rsa","encrypt","decrypt","asymmetric","key"] },
  { id: "hash",      category: "security",   icon: "#️⃣", name: "Hash Generator",       description: "MD5, SHA-1, SHA-256, SHA-512 con comparador de hashes",         tags: ["hash","sha","md5","sha256","sha512","checksum"] },
  { id: "bcrypt",    category: "security",   icon: "🧂", name: "Bcrypt",               description: "Hash y verifica contraseñas con bcrypt, slider de rounds",       tags: ["bcrypt","hash","password","verify","rounds"] },
  { id: "aes",       category: "security",   icon: "🔐", name: "AES-256 Encrypt",      description: "Cifrado simétrico AES-GCM con passphrase y PBKDF2",             tags: ["aes","symmetric","encrypt","decrypt","aes256"] },
  { id: "jwt",       category: "security",   icon: "🎫", name: "JWT Inspector",        description: "Decodifica y analiza tokens JWT — header, payload, expiración", tags: ["jwt","token","decode","inspect","auth"] },
  { id: "passgen",   category: "security",   icon: "🛡️", name: "Password Generator",  description: "Contraseñas seguras con opciones de longitud y caracteres",      tags: ["password","generator","secure","strength"] },

  // ── Transform ─────────────────────────────────────────────────
  { id: "json",      category: "transform",  icon: "📝", name: "JSON Formatter",       description: "Prettify, minify y valida JSON con coloreado de sintaxis",      tags: ["json","format","validate","minify","prettify"] },
  { id: "base64",    category: "transform",  icon: "📦", name: "Base64",               description: "Codifica y decodifica texto e imágenes en Base64",              tags: ["base64","encode","decode","binary"] },
  { id: "urlencode", category: "transform",  icon: "🔗", name: "URL Encode/Decode",    description: "Codifica y decodifica URLs y componentes de query string",      tags: ["url","encode","decode","percent","query"] },
  { id: "jscsv",     category: "transform",  icon: "⇄",  name: "JSON ↔ CSV",           description: "Convierte entre JSON y CSV con preview de tabla",               tags: ["json","csv","convert","table","transform"] },
  { id: "yamljson",  category: "transform",  icon: "📄", name: "YAML ↔ JSON",          description: "Convierte y valida entre YAML y JSON",                          tags: ["yaml","json","convert","validate"] },
  { id: "markdown",  category: "transform",  icon: "✍️", name: "Markdown Preview",     description: "Editor con preview renderizado en tiempo real",                 tags: ["markdown","preview","html","render","md"] },
  { id: "entities",  category: "transform",  icon: "🔤", name: "HTML Entities",        description: "Codifica y decodifica entidades HTML &amp; &lt; &gt;",         tags: ["html","entities","encode","decode","escape"] },

  // ── Network ───────────────────────────────────────────────────
  { id: "urlparser", category: "network",    icon: "🔍", name: "URL Parser",           description: "Descompone URL en protocolo, host, path, params y hash",       tags: ["url","parse","query","params","host","protocol"] },
  { id: "regex",     category: "network",    icon: "🧩", name: "Regex Tester",         description: "Prueba expresiones regulares con highlights de matches",        tags: ["regex","regexp","test","match","pattern"] },
  { id: "cors",      category: "network",    icon: "🌐", name: "CORS Header Builder",  description: "Genera headers Access-Control-* con UI visual",                 tags: ["cors","headers","access-control","origin"] },
  { id: "httpstatus",category: "network",    icon: "📡", name: "HTTP Status Codes",    description: "Referencia completa de códigos de estado HTTP 1xx–5xx",        tags: ["http","status","codes","reference","error","200","404"] },
  { id: "useragent", category: "network",    icon: "🖥️", name: "User Agent Parser",   description: "Detecta browser, OS y dispositivo desde un UA string",         tags: ["user-agent","browser","os","device","parse"] },

  // ── Dev Tools ─────────────────────────────────────────────────
  { id: "timestamp", category: "devtools",   icon: "⏱️", name: "Timestamp Converter",  description: "Unix epoch ↔ ISO 8601 ↔ legible humano con timezone",          tags: ["timestamp","unix","epoch","iso","date","time"] },
  { id: "cron",      category: "devtools",   icon: "⏰", name: "Cron Builder",         description: "Construye y explica expresiones cron con UI visual",            tags: ["cron","schedule","expression","job","interval"] },
  { id: "color",     category: "devtools",   icon: "🎨", name: "Color Converter",      description: "HEX ↔ RGB ↔ HSL ↔ HSV con contraste WCAG",                    tags: ["color","hex","rgb","hsl","hsv","picker","wcag"] },
  { id: "numbase",   category: "devtools",   icon: "🔢", name: "Number Base",          description: "Decimal ↔ Binario ↔ Hexadecimal ↔ Octal en tiempo real",       tags: ["binary","hex","octal","decimal","base","convert"] },
  { id: "diff",      category: "devtools",   icon: "📊", name: "Diff Checker",         description: "Compara dos textos lado a lado con highlights de cambios",      tags: ["diff","compare","text","changes","lines"] },
  { id: "uuid",      category: "devtools",   icon: "🆔", name: "UUID Generator",       description: "Genera UUIDs v4, batch, valida y formatea",                    tags: ["uuid","guid","generate","v4","unique","id"] },

  // ── Generators ────────────────────────────────────────────────
  { id: "qr",        category: "generators", icon: "▦",  name: "QR Code Generator",   description: "Convierte texto o URL a código QR descargable",                 tags: ["qr","qrcode","generate","barcode","url"] },
  { id: "lorem",     category: "generators", icon: "📜", name: "Lorem Ipsum",          description: "Genera texto de relleno por palabras, oraciones o párrafos",   tags: ["lorem","ipsum","placeholder","text","generate"] },
  { id: "debitcard", category: "generators", icon: "💳", name: "Debit Card Generator", description: "Tarjeta 3D interactiva con Luhn, marca y exportación",          tags: ["card","debit","credit","luhn","3d","generator"] },

  // ── Text ──────────────────────────────────────────────────────
  { id: "textstats", category: "text",       icon: "📈", name: "Text Statistics",      description: "Palabras, chars, oraciones, tiempo de lectura y frecuencia",   tags: ["text","stats","words","characters","reading","frequency"] },
  { id: "caseconv",  category: "text",       icon: "Aa", name: "Case Converter",       description: "camelCase, PascalCase, snake_case, kebab-case, UPPER y más",   tags: ["case","camel","pascal","snake","kebab","convert","text"] },
];
