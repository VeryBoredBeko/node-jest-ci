require('dotenv').config();

const getSecurityConfig = () => ({
  minLength: parseInt(process.env.MIN_LENGTH) || 8,
  requireNumbers: process.env.REQUIRE_NUMBERS === 'true',
  requireSpecial: process.env.REQUIRE_SPECIAL_CHARS === 'true'
});

module.exports = { getSecurityConfig };