const { getSecurityConfig } = require("./utils/configLoader");
const { validatePassword } = require("./validator");

// Получаем пароль из аргументов командной строки
const userPassword = process.argv[2];

if (!userPassword) {
  console.log("Использование: node src/index.js <ваш_пароль>");
  process.exit(1);
}

const config = getSecurityConfig();
const result = validatePassword(userPassword, config);

if (result.isValid) {
  console.log("Пароль соответствует политикам безопасности!");
} else {
  console.error("Ошибки безопасности:");
  result.errors.forEach((err) => console.log(` - ${err}`));
}
