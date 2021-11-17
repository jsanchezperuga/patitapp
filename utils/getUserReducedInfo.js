export default function (user) {
  let userImage = user.user.providerData[0].photoURL;
  const userName = user.user.providerData[0].displayName;
  const hasImage = userImage !== "default" && userImage !== null;
  userImage = hasImage ? userImage : "https://lh3.googleusercontent.com/proxy/_On6GCGHXtCMwBbaxWEPSIGS0LnpCALNz5b2QoDuFgLXJQCCpJNe4D-SC9ZIOgvY7OUK-0iw8naXvF2L0tiM_Ra-bz8H9dnJIoPk9srq";
  return { userName, userImage };
}