import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const isPasswordCorrect = async (password, hash) => {
  const isCorrect = await bcrypt.compare(password, hash);
  return isCorrect;
};

export { hashPassword, isPasswordCorrect };
