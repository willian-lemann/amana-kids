import { Calendar, HomeIcon, Users } from "lucide-react";

import type { Route } from "./+types/home";
import { Can } from "~/components/can";
import { useOutletContext } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { HomeContent } from "~/components/home-content";
import { AdminContent } from "~/components/admin-content";

import type { User } from "~/api/types";
import { ChildrenContent } from "~/components/children-content";
import { getChildren } from "~/api/children";
import { db } from "~/api/database";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Amana kids" },
    { name: "description", content: "Bem vindo ao ministerio do amana kids!" },
  ];
}

export async function loader() {
  const { data, error } = await getChildren(db);
  if (error) {
    return {
      children: [],
      error: "Erro ao carregar as crianças.",
    };
  }

  return {
    children: data,
  };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const currentUser: User = useOutletContext();

  const { children } = loaderData;

  return (
    <>
      <Tabs defaultValue="inicio" className="">
        <TabsList className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-8 shadow-lg w-full flex justify-around items-center  border-none">
          <TabsTrigger
            value="inicio"
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2 w-full text-gray-500"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </TabsTrigger>

          <Can isAdmin={currentUser.is_admin}>
            <TabsTrigger
              value="admin"
              className="flex-1 flex flex-col items-center gap-1 h-auto py-2 w-full text-gray-500"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Admin</span>
            </TabsTrigger>
          </Can>

          <TabsTrigger
            value="criancas"
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2 w-full text-gray-500"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Crianças</span>
          </TabsTrigger>
          <TabsTrigger
            value="cultos"
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2 w-full text-gray-500"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Cultos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inicio">
          <HomeContent />
        </TabsContent>

        <TabsContent value="admin">
          <Can isAdmin={currentUser.is_admin}>
            <AdminContent />
          </Can>
        </TabsContent>
        <TabsContent value="criancas">
          <ChildrenContent children={children} />
        </TabsContent>
        <TabsContent value="cultos" className="hidden" />
      </Tabs>
    </>
  );
}
