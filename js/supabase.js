// ============================================
// ZOMA — Supabase Client
// ============================================

const SUPABASE_URL = "https://wpwdqoqaqvdbginlrwau.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwd2Rxb3FhcXZkYmdpbmxyd2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMzc5MDcsImV4cCI6MjEwNDcxMzkwN30.m569mhi4-mPLxC1LsWOOspH3q8R_Ykq_WaQbqNYZ_kw";

// إنشاء العميل
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

console.log("✅ ZOMA: Supabase connected");