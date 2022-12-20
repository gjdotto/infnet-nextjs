import { Perfil } from "./Perfil";

export type ProfileHeaderProps = {
  username: string;
  photo: string;
  name: string;
  role: string;
  bio: string;
  link: string;
  publishCount: number;
};

export function ProfileHeader({
  photo,
  bio,
  link,
  name,
  publishCount,
  role,
  username,
}: ProfileHeaderProps) {
  console.log(photo);
  return (
    <div className="profile-header">
      <div className="row">
        <div className="avatar item">
          <Perfil src={photo} size={128} alt={`Foto de ${username}`} />
        </div>
      </div>
      <div className="row">
        <h2 className="name item">
          <span>{name}</span>
        </h2>
        <div className="publish-container item">
          <span className="publish-count">{publishCount}</span>{" "}
          <span>viagens</span>
        </div>
        <div className="username item">
          <span>{username}</span>
        </div>
        <div className="role item">
          <span>{role}</span>
        </div>
        <div className="bio item">
          <p>{bio}</p>
        </div>
        <div className="link item">
          <a href={link} title={`Foto de ${name}`} target="__blank">
            {new URL(link).host}
          </a>
        </div>
      </div>
      <style jsx>{`
        .profile-header {
          display: flex;
          padding: 32px 0;
        }

        .item:not(:first-child) {
          margin-top: 4px;
        }

        .publish-container {
          margin: 16px 0 !important;
        }

        .publish-count {
          font-weight: bold;
        }

        .name {
          font-size: 28px;
        }

        .username {
          font-weight: bold;
        }

        .role {
          color: rgba(0, 0, 0, 0.7);
        }

        .avatar {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 960px) {
          .profile-header {
            flex-direction: column;
          }
        }

        @media (min-width: 960px) {
          .profile-header {
            flex-direction: row;
            justify-content: flex-start;
          }

          .row {
            display: flex;
            justify-content: center;
            flex-direction: column;
          }

          .avatar {
            width: 256px;
          }
        }
      `}</style>
    </div>
  );
}
