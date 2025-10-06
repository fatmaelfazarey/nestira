export const registerUserWithProfile = async (email: string, password: string, data: any) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  await setDoc(doc(db, "users", uid), {
    email,
    ...data,
    createdAt: new Date(),
  });

  return userCred.user;
};
