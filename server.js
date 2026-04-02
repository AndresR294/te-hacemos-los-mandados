const express = require('express');
const app = express();

app.use(express.json());

let supabase = null;

if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  console.log("✅ Supabase conectado");
} else {
  console.log("⚠️ Supabase no configurado");
}

app.get('/', (req,res)=>res.send("LEDL AUTO v2 🚀"));
app.get('/ping', (req,res)=>res.json({ok:true}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log("🔥 Server running on port", PORT);
});
