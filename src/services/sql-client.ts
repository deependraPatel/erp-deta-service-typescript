import { createClient } from "@supabase/supabase-js";
import Constants from "../shared/constants";

const options = {
	schema: "public",
	headers: { "x-my-custom-header": Constants.supabaseCongif.appName },
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
};
export default createClient(
	Constants.supabaseCongif.url,
	Constants.supabaseCongif.publicAnonKey,
	options
);
