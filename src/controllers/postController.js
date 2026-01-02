import { supabase } from "../config/supabase.js";
import { createClient } from "@supabase/supabase-js";

/* ====================
   CREATE POST
==================== */
export const createPost = async (req, res) => {
  const { title, content, is_public } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  const supabaseAuth = getSupabaseWithAuth(token);

  const { error } = await supabaseAuth
    .from("posts")
    .insert({
      title,
      content,
      is_public
    });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Post berhasil dibuat" });
};

/* ====================
   GET PUBLIC POSTS
==================== */
export const getPublicPosts = async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};

/* ====================
   GET POST BY ID
==================== */
export const getPostById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !data) {
    return res.status(404).json({
      message: "Post tidak ditemukan"
    });
  }

  res.json(data);
};

/* ====================
   GET MY POSTS
==================== */
export const getMyPosts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const supabaseAuth = getSupabaseWithAuth(token);

  const { data, error } = await supabaseAuth
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};

/* ====================
   DELETE POST
==================== */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Post berhasil dihapus" });
};

/* ====================
   HELPER
==================== */
const getSupabaseWithAuth = (token) => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  );
};
