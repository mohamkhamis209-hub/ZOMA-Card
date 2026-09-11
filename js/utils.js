// ============================================
// ZOMA — Utilities
// ============================================

// توليد Order ID: ZOMA-1025
function generateOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `ZOMA-${n}`;
}

// توليد Card ID: ZOMA-C8F42K
function generateCardId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ZOMA-${code}`;
}

// رابط البطاقة
function cardUrl(cardId) {
  const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, "");
  return `${base}card.html?id=${cardId}`;
}

// رسائل بسيطة
function showMsg(msg, type = "info") {
  alert(msg);
}

function showError(msg) {
  alert("❌ " + msg);
}

function showSuccess(msg) {
  alert("✅ " + msg);
}

// تنظيف النصوص
function cleanPhone(p) {
  return p.replace(/[^0-9]/g, "");
}

// رابط واتساب
function whatsappLink(number) {
  return `https://wa.me/${cleanPhone(number)}`;
}

// رابط فيسبوك
function facebookLink(username) {
  if (username.startsWith("http")) return username;
  return `https://facebook.com/${username}`;
}

// رابط تيك توك
function tiktokLink(username) {
  if (username.startsWith("http")) return username;
  return `https://tiktok.com/@${username.replace("@", "")}`;
}