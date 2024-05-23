import { Link, Image } from "@nextui-org/react";
import CustomNav from "@/components/CustomNav";
import { getUserProfileData } from "@/lib/actions/user";

export default async function Profile() {
  const userProfile = await getUserProfileData();
  const profileData = userProfile?.data ?? null;
  const isProfileMissingData = profileData
    ? ["profile_pic", "user_name", "fullName", "bio"].some(
        (key) => !profileData[key as keyof typeof profileData]
      )
    : true;
  const isImageEmpty = !profileData?.profile_pic;

  return (
    <section className="flex flex-col">
      <CustomNav></CustomNav>
      <div
        className={`flex flex-col md:flex-row h-auto  justify-center  min-w-screen max-w-5xl  px-4 gap-8 `}
      >
        <div className="flex flex-col gap-2 ">
          {!isImageEmpty && (
            <Image
              src={profileData.profile_pic!}
              alt="Profile Picture"
              width={300}
              height={300}
              className="self-center"
            ></Image>
          )}
          <h1 className="text-2xl font-bold">
            {profileData?.user_name ?? "No username"}
          </h1>
          <p>{profileData?.fullName ?? "No full name"}</p>
          <p>{profileData?.bio ?? "No bio available"}</p>
          {isProfileMissingData && (
            <p className="text-xl mt-2">
              Your profile is missing data. Please fill in your profile:
            </p>
          )}
          <Link href="/profile/edit" className="text-warning">
            Edit Profile
          </Link>
        </div>
        <div className="flex flex-col gap-2  ">
          {/* render users posts here
           */}
        </div>
      </div>
    </section>
  );
}
