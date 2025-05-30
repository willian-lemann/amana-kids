import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BookOpen, Calendar, Heart, HomeIcon, Star, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Amana kids" },
    { name: "description", content: "Bem vindo ao ministerio do amana kids!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Amana Kids</h1>
            <p className="text-blue-100 text-sm">Igreja Amana</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-4 bg-white/10 rounded-2xl p-3">
          <p className="text-sm font-medium">Bem-vindo(a)! 👋</p>
          <p className="text-xs text-blue-100">
            Que bom ter você aqui conosco hoje!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 pb-20">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold text-sm">Próximo Evento</p>
              <p className="text-xs opacity-90">Domingo 10h</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold text-sm">Lição de Hoje</p>
              <p className="text-xs opacity-90">Amor de Deus</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Próximas Atividades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div>
                <p className="font-medium text-sm">Culto Infantil</p>
                <p className="text-xs text-gray-600">Domingo, 10:00</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Hoje
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div>
                <p className="font-medium text-sm">Escola Bíblica</p>
                <p className="text-xs text-gray-600">Quarta, 19:30</p>
              </div>
              <Badge variant="outline">Em 3 dias</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div>
                <p className="font-medium text-sm">Acampamento Kids</p>
                <p className="text-xs text-gray-600">Sábado, 14:00</p>
              </div>
              <Badge variant="outline">Próximo sábado</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Bible Verse of the Day */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Versículo do Dia</p>
                <p className="text-sm italic leading-relaxed">
                  "Porque Deus amou o mundo de tal maneira que deu o seu Filho
                  unigênito..."
                </p>
                <p className="text-xs opacity-90 mt-2">João 3:16</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="outline"
            className="h-14 justify-start gap-3 bg-white shadow-sm"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Minha Turma</p>
              <p className="text-xs text-gray-500">
                Veja seus amigos e professores
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-14 justify-start gap-3 bg-white shadow-sm"
          >
            <Heart className="w-5 h-5 text-red-500" />
            <div className="text-left">
              <p className="font-medium text-sm">Oração</p>
              <p className="text-xs text-gray-500">Compartilhe seus pedidos</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex-col gap-1 h-auto py-2 text-blue-600"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-col gap-1 h-auto py-2 text-gray-500"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Eventos</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-col gap-1 h-auto py-2 text-gray-500"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Lições</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-col gap-1 h-auto py-2 text-gray-500"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Turma</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
