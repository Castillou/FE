import { DesignerDetailResponse } from "@/types/apiTypes";

const ImageSection = ({ designer }: { designer: DesignerDetailResponse }) => {
  return (
    <section>
      <div className="mb-4 w-full h-80 aspect-ratio rounded-xl overflow-hidden">
        <img
          src={designer.profile_image || "/images/DEFAULT_PROFILE.jpg"}
          onError={(e) => {
            e.currentTarget.src = "/images/DEFAULT_PROFILE.jpg";
          }}
          alt="Reservation Image"
          className="size-full object-cover object-top"
        />
      </div>
    </section>
  );
};

export default ImageSection;
