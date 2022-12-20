import type { User } from "src/user/userRepository";
import { Perfil } from "src/components/Perfil";

type UserItemProps = {
  user: User;
};

export function UserItem({ user }: UserItemProps) {
  const fullName = `${user.name} ${user.surname}`;
  return (
    <div className="user-item">
      <Perfil name={fullName} alt="" size={36} />
      <span className="user-item-name">{fullName}</span>
      <style jsx>{`
        .user-item {
          display: flex;
          align-items: center;
          padding: 10px;
        }

        .user-item-name {
          font-size: 16px;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
