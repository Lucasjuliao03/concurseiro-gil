// Test login directly
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://melyesnqvbatmpxvotwc.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_xeeN1Wgcjl4e_7oCP1c51Q_3gycLIvQ";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "lucasjuliao03@gmail.com",
    password: "31012011"
  });

  if (error) {
    console.error("Login error:", error.message);
    return;
  }
  
  console.log("Logged in!", data.user.id);

  const { data: profile, error: profError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profError) {
    console.error("Profile error:", profError.message);
  } else {
    console.log("Profile:", profile);
  }
}

test();
