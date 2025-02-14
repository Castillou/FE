import { User } from "@/types/apiTypes";

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <section className="px-4">
      <article className="flex gap-4 items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={user.profile_image} alt="프로필 이미지" className="size-full object-cover" />
        </div>
        <div>
          <h3 className="text-sub-title font-semibold">{user.name}</h3>
          <p className="text-body2 text-gray-scale-300">{user.email}</p>
        </div>
      </article>
    </section>
  );
};

export default ProfileInfo;
