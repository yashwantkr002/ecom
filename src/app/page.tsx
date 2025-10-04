import Image from "next/image";

export default function Home() {
  return (
  <>  
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Image src="/next.svg" alt="Next.js Logo" width={200} height={160} />
  </>
  );
}
