import bcrypt from "bcrypt";

// Fonction pour hacher un mot de passe
export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
export async function checkPassword(
  userPassword: string,
  dbPassword: string
): Promise<boolean> {
  // compare the user entered password with the stored one
  return await bcrypt.compare(userPassword, dbPassword);
}
