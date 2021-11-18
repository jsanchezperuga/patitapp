export default function (user) {
  let userImage = user.user.providerData[0].photoURL;
  const userName = user.user.providerData[0].displayName;
  const hasImage = userImage !== "default" && userImage !== null;
  userImage = hasImage ? userImage : "https://raw.githubusercontent.com/00frank/patitapp/main/assets/unknown-user.png";
  return { userName, userImage };
}