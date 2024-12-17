/**
 * Supabase Configuration
 * 
 * This file serves as a reference for setting up your .env file
 * Create a .env file in the root directory with the following variables:
 * 
 * Required Environment Variables:
 * REACT_APP_SUPABASE_URL=your-supabase-project-url
 * REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
 * REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional, for admin functions)
 */

// Supabase client configuration
export const SUPABASE_CONFIG = {
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
};

/**
 * Instructions for setting up your .env file:
 * 
 * 1. Create a new .env file in the root directory
 * 2. Add the following variables with your Supabase project values:
 * 
 * REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
 * REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * REACT_APP_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 
 * 3. Never commit your .env file to version control
 * 4. Add .env to your .gitignore file
 * 
 * To get these values:
 * 1. Go to your Supabase project dashboard
 * 2. Click on Settings -> API
 * 3. Copy the URL and anon/public key
 * 4. (Optional) Copy the service_role key for admin functions
 */

// Example usage in your application:
/*
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG } from './config/supabase.config'

const supabase = createClient(
  SUPABASE_CONFIG.supabaseUrl,
  SUPABASE_CONFIG.supabaseAnonKey
)
*/
