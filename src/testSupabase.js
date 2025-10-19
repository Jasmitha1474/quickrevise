import { supabase } from "./supabaseClient.js";

async function testConnection() {
  const { data, error } = await supabase.from("flashcards").select("*").limit(5);
  if (error) console.error("❌ Error:", error);
  else console.log("✅ Got data:", data);
}

testConnection();
