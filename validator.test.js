const { validatePassword } = require("./src/validator");
const { getSecurityConfig } = require("./src/utils/configLoader");
const fs = require("fs");

// UNIT-ТЕСТЫ
describe("Unit Tests: Логика валидации", () => {
  const config = { minLength: 8, requireNumbers: true, requireSpecial: true };

  test("1. Валидный пароль проходит проверку", () => {
    const res = validatePassword("Pass1234!", config);
    expect(res.isValid).toBe(true);
  });

  test("2. Ошибка, если пароль слишком короткий", () => {
    const res = validatePassword("P1!", config);
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain("Минимальная длина: 8");
  });

  test("3. Ошибка, если нет цифр", () => {
    const res = validatePassword("Password!", config);
    expect(res.errors).toContain("Нужна хотя бы одна цифра");
  });

  test("4. Ошибка, если нет спецсимволов", () => {
    const res = validatePassword("Password123", config);
    expect(res.errors).toContain("Нужен спецсимвол");
  });

  test("5. Граничное значение: ровно 8 символов (успех)", () => {
    const res = validatePassword("A1!aaaaa", config);
    expect(res.isValid).toBe(true);
  });

  test("6. Пустая строка возвращает все ошибки сразу", () => {
    const res = validatePassword("", config);
    expect(res.errors.length).toBeGreaterThan(1);
  });
});

// ИНТЕГРАЦИОННЫЕ ТЕСТЫ
// Проверяем связку: файл .env -> загрузчик -> валидатор
describe("Integration Tests: Работа с окружением", () => {
  test("1. Загрузчик конфига корректно читает данные (Mock .env)", () => {
    const config = getSecurityConfig();
    // Проверяем, что вернулся объект с нужными ключами, а не undefined
    expect(config).toHaveProperty("minLength");
    expect(config).toHaveProperty("requireNumbers");
  });

  test("2. Валидатор правильно применяет параметры, считанные из конфига", () => {
    const realConfig = getSecurityConfig();
    const result = validatePassword("123", realConfig);
    // Если в .env длина 10, то '123' должен провалиться
    expect(result.isValid).toBe(false);
  });
});

// НЕГАТИВНЫЙ ТЕСТ
describe("Negative Tests: Обработка ошибок", () => {
  test("Должен выбрасывать ошибку, если пароль не является строкой", () => {
    // Ожидаем, что функция выбросит исключение (Error) при передаче null или числа
    expect(() => {
      validatePassword(null, {});
    }).toThrow();
  });
});
