// ============================================
// ZOMA — Auth
// ============================================

// ---------- إنشاء حساب ----------
async function signup(fullName, phone, password) {
  try {
    const cleanP = cleanPhone(phone);
    if (!fullName || !cleanP || !password) {
      throw new Error("من فضلك املأ كل البيانات");
    }

    if (password.length < 6) {
      throw new Error("كلمة المرور لازم 6 أحرف على الأقل");
    }

    const fakeEmail = `${cleanP}@zoma.local`;

    // 1) إنشاء المستخدم في auth.users
    const { data, error } = await db.auth.signUp({
      email: fakeEmail,
      password: password
    });

    if (error) throw error;

    // 2) إنشاء البروفايل
    const { error: profileErr } = await db.from("profiles").insert({
      id: data.user.id,
      full_name: fullName,
      phone: cleanP,
      role: "customer"
    });

    if (profileErr) throw profileErr;

    showSuccess("تم إنشاء حسابك بنجاح");
    setTimeout(() => location.href = "dashboard.html", 1000);
  } catch (e) {
    console.error(e);
    showError(e.message || "خطأ في إنشاء الحساب");
  }
}

// ---------- تسجيل الدخول ----------
async function login(identifier, password) {
  try {
    if (!identifier || !password) {
      throw new Error("من فضلك املأ كل البيانات");
    }

    let email;

    // لو المستخدم دخل Card ID
    if (identifier.toUpperCase().startsWith("ZOMA-") && identifier.length > 5 && !/^\d/.test(identifier.replace("ZOMA-", ""))) {
      // ⚠️ ممكن يكون Card ID أو Order ID
      // نحاول نجيبه من cards الأول
      const { data: card } = await db
        .from("cards")
        .select("user_id, profiles(phone)")
        .eq("id", identifier.toUpperCase())
        .maybeSingle();

      if (card && card.profiles) {
        email = `${card.profiles.phone}@zoma.local`;
      } else {
        throw new Error("البطاقة غير موجودة");
      }
    } else {
      // هاتف
      const cleanP = cleanPhone(identifier);
      email = `${cleanP}@zoma.local`;
    }

    const { data, error } = await db.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    showSuccess("تم تسجيل الدخول");
    setTimeout(() => location.href = "dashboard.html", 800);
  } catch (e) {
    console.error(e);
    showError("بيانات الدخول غير صحيحة");
  }
}

// ---------- تسجيل الخروج ----------
async function logout() {
  await db.auth.signOut();
  location.href = "index.html";
}

// ---------- حماية الصفحات ----------
async function requireAuth() {
  const { data } = await db.auth.getUser();
  if (!data.user) {
    location.href = "login.html";
    return null;
  }
  return data.user;
}

async function requireAdmin() {
  const user = await requireAuth();
  if (!user) return null;

  const { data } = await db
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!data || data.role !== "admin") {
    location.href = "dashboard.html";
    return null;
  }
  return user;
}

// ---------- جلب البروفايل الحالي ----------
async function getProfile() {
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;

  const { data } = await db
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}