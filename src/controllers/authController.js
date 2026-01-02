import { supabase } from "src/config/supabase.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Register berhasil" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({
    access_token: data.session.access_token,
    user: data.user
  });
};
