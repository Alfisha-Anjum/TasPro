import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";
import { useRouter } from "next/navigation";

export default function ProfileCard({ profile }: { profile: any }) {
  const router = useRouter();

  return (
    <div className="flex flex-col mb-10 items-center lg:items-start text-center lg:text-left">
      <Image
        src={profile?.profile_url || "/img/profileimg.png"}
        alt="profile"
        width={100}
        height={100}
        className="w-[100px] h-[100px] rounded-full object-cover overflow-hidden mb-3"
      />

      <h4 className="font-semibold text-[#0A0F0D] dark:text-white text-[16px]">
        {profile?.first_name || "User"}
      </h4>

      <p className="text-[#808080] text-[14px] dark:text-gray-200">
        {profile?.email || "No email added"}
      </p>

      <div className="flex gap-2 md:gap-3 mt-5">
        <GradientButton
          text="My Bookings"
          width="w-[150px] md:w-[185px]"
          height="h-[35px]"
          textClassName="text-[16px]"
          onClick={() => router.push("/my-booking")}
        />

        <GradientButton
          text="Help Center"
          width="w-[150px] md:w-[185px]"
          height="h-[35px]"
          textClassName="text-[16px]"
          onClick={() => router.push("/contact-us")}
        />
      </div>
    </div>
  );
}
