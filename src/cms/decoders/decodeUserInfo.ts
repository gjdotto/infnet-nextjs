import { getImageUrl } from "src/cms/getImageUrl";

export type UserInfoData = {
  name: string;
  username: string;
  role: string;
  bio: string;
  link: string;
  photo: string;
};

export function decodeUserInfo(data: any): UserInfoData {
  const {
    name = "",
    username = "",
    role = "",
    bio = "",
    link = "",
  } = data?.profileInfo.data.attributes ?? {};

  const photo =
    data && data.profileInfo.data.attributes.photo
      ? getImageUrl(data.profileInfo.data.attributes.photo.data.attributes.url)
      : "/avatar.jpeg";
  
  return {
    name,
    username,
    role,
    bio,
    link,
    photo,
  };
}
