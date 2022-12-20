import { useEffect } from "react";
import { useLazyQuery } from "src/cms/apolloClient";
import { Perfil, AvatarProps } from "src/components/Perfil";
import { queryUserAvatar } from "../queries/queryUserAvatar";
import { decodeUserInfo } from "../decoders/decodeUserInfo";

export type UserAvatarProps = Omit<AvatarProps, "src" | "alt">;

export function UserAvatar({ size }: UserAvatarProps) {
  const [getUserAvatar, { data }] = useLazyQuery(queryUserAvatar);
  useEffect(() => {
    getUserAvatar();
  }, []);

  const user = decodeUserInfo(data);
  return <Perfil size={size} alt={user.name} src={user.photo} />;
}
