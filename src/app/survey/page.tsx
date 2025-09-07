"use client";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/storage";

export default function MyComponent() {
  const router = useRouter();

  const handleSubmit = () => {
    const user = getUser();
    if (user?.stage === "school") {
      if (user.schoolLevel === "primary") {
        router.push("/dashboard/school/primary");
      } else if (user.schoolLevel === "secondary") {
        router.push("/dashboard/school/secondary");
      } else if (user.schoolLevel === "higher") {
        router.push("/dashboard/school/higher");
      }
    } else if (user?.stage === "college") {
      router.push("/dashboard/college");
    } else {
      router.push("/dashboard");
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
  