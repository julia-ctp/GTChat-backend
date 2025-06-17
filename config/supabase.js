const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

const supabase = createClient(apiKey, apiUrl, {db: chat})

module.exports = supabase