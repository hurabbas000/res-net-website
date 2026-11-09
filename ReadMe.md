### Admin sign-in
Open `/admin-login` to access the administrator sign-in page; it is intentionally not linked in public navigation.
Only accounts with the `admin` role in the Supabase `profiles` table can sign in and access the dashboard.
Assign admin roles only to trusted accounts, and enforce dashboard data access with Supabase Row Level Security.