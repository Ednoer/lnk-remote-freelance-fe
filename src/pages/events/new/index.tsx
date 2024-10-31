import MainLayout from "@/components/main/MainLayout";
import UpsertEvent from "@/layouts/events/UpsertEvent";
import { NextPage } from "next";

const MainEmployees: NextPage = () => {
  return (
    <MainLayout className="pt-12 px-6" title="Add Event">
      <UpsertEvent />
    </MainLayout>
  );
}

export default MainEmployees;