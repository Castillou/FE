import { UserMeResponse } from "@/types/user";

interface ProfileInfoProps {
  user: UserMeResponse;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <section>
      <article className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-5">
          <img src={user.profile_image} alt="프로필 이미지" className="size-full object-cover" />
        </div>
        <div>
          <h3 className="text-center text-2xl font-bold">{user.name}</h3>
        </div>
      </article>
      <article className="mb-8">
        <h3 className="text-sub-title font-semibold mb-2">관심있는 요소</h3>
        <ul className="flex gap-2">
          <li className="px-4 py-1 rounded-full bg-purple-100 text-purple-700">
            <span>땅콩형 두상</span>
          </li>
          <li className="px-4 py-1 rounded-full bg-purple-100 text-purple-700">
            <span>펌</span>
          </li>
        </ul>
      </article>
      <article className="mb-8">
        <h3 className="text-sub-title font-semibold mb-2">자기소개</h3>
        <div className="w-full bg-gray-scale-100 p-3 text-body1 text-gray-scale-300 rounded-lg">
          안녕하세요! 헤어에 관심이 많은 18세 할머리입니다. 땅콩형 얼굴에 어울리지 않는 헤어스타일이
          고민이에요
        </div>
      </article>
    </section>
  );
};

export default ProfileInfo;
