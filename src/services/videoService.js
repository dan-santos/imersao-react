import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ebieecdfyyotezclfqxd.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaWVlY2RmeXlvdGV6Y2xmcXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODUzMTMsImV4cCI6MTk4Mzg2MTMxM30.XXF-p8G3rVl3rRrcvrieDEFUNWy0_udV0DtoNbbFk90"
);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    }
  }
}