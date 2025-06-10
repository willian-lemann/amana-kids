import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BookOpen, Calendar, Heart, Star, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export function HomeContent() {
  function getNextSundayAt19() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + daysUntilSunday);
    nextSunday.setHours(19, 0, 0, 0);

    // Se hoje é domingo e ainda não deu 19:00, retorna hoje às 19:00
    if (dayOfWeek === 0 && now < nextSunday) {
      return nextSunday;
    }
    // Se já passou das 19:00 de hoje, pega o próximo domingo
    if (dayOfWeek === 0 && now >= nextSunday) {
      nextSunday.setDate(nextSunday.getDate() + 7);
      return nextSunday;
    }
    return nextSunday;
  }

  const now = new Date();
  const nextSundayAt19 = getNextSundayAt19();
  const isTodaySunday = now.getDay() === 0;
  const isCultoNow =
    isTodaySunday &&
    now.getHours() === 19 &&
    now.getMinutes() >= 0 &&
    now.getMinutes() < 60;

  let cardTitle = "Próximo Culto";
  let cardSubtitle = "";

  if (isTodaySunday && now.getHours() < 19) {
    cardTitle = "Culto Hoje";
    cardSubtitle = "Hoje às 19:00";
  } else if (isCultoNow) {
    cardTitle = "Culto em andamento";
    cardSubtitle = "";
  } else {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    };
    cardSubtitle =
      nextSundayAt19.toLocaleDateString("pt-BR", options) + " às 19:00";
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-[#ff3d80] to-[#ff3d80] text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-sm">{cardTitle}</p>
            <p className="text-xs opacity-90">{cardSubtitle}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#c9e265] via-[#c9e265] via-90% to-[#c9e265] text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-sm">Lição de Hoje</p>
            <p className="text-xs opacity-90">Amor de Deus</p>
          </CardContent>
        </Card>
      </div>

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
      <Card className="bg-gradient-to-r from-purple-500 to-[#ff3e7f] text-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Versículo do Mês</p>
              <p className="text-sm italic leading-relaxed">
                "Porque Deus amou o mundo de tal maneira que deu o seu Filho
                unigênito..."
              </p>
              <p className="text-xs opacity-90 mt-2">João 3:16</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
  );
}
