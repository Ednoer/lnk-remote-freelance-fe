import { Inter } from "next/font/google";
import MainLayout from "@/components/main/MainLayout";
import EmailCalendar from "@/layouts/main/EmailCalendar";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialTime }: any) {
  return (
    <MainLayout className="pt-12 px-6" title="Big Calendar">
      <EmailCalendar initialTime={initialTime} />
    </MainLayout>
  );
}

export async function getServerSideProps(context: any) {
  return {
      props: {
          initialTime: new Date().toISOString(),
      },
  };
}
