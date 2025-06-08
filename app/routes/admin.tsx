import { useState } from "react";
import { Button } from "app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Textarea } from "app/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "app/components/ui/tabs";
import { Badge } from "app/components/ui/badge";
import { Checkbox } from "app/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import {
  Trash2,
  Plus,
  Users,
  Calendar,
  AlertTriangle,
  Bell,
} from "lucide-react";
import type { Route } from "./+types/admin";

// Interfaces
interface Aviso {
  id: number;
  titulo: string;
  conteudo: string;
  tipo: "info" | "importante" | "urgente";
  data_criacao: string;
  ativo: boolean;
}

interface Evento {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  responsavel: string;
}

interface Emergencia {
  id: number;
  titulo: string;
  descricao: string;
  nivel: "baixo" | "medio" | "alto" | "critico";
  data_ocorrencia: string;
  resolvido: boolean;
}

interface Crianca {
  id: number;
  nome_completo: string;
  idade: number;
  nome_responsavel: string;
}

interface Presenca {
  crianca_id: number;
  data: string;
  presente: boolean;
}

export default function PainelAdministrativo({}: Route.ComponentProps) {
  // Estados para Avisos
  const [avisos, setAvisos] = useState<Aviso[]>([
    {
      id: 1,
      titulo: "Reunião de Pais",
      conteudo: "Reunião marcada para discutir atividades do próximo mês",
      tipo: "importante",
      data_criacao: "2024-01-15",
      ativo: true,
    },
  ]);

  const [novoAviso, setNovoAviso] = useState<
    Omit<Aviso, "id" | "data_criacao">
  >({
    titulo: "",
    conteudo: "",
    tipo: "info",
    ativo: true,
  });

  // Estados para Eventos
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      nome: "Festa Junina",
      descricao: "Festa junina com brincadeiras e comidas típicas",
      data: "2024-06-15",
      horario: "15:00",
      local: "Salão Principal",
      responsavel: "Maria Silva",
    },
  ]);

  const [novoEvento, setNovoEvento] = useState<Omit<Evento, "id">>({
    nome: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
    responsavel: "",
  });

  // Estados para Emergências
  const [emergencias, setEmergencias] = useState<Emergencia[]>([
    {
      id: 1,
      titulo: "Criança com febre",
      descricao: "João apresentou febre durante a aula",
      nivel: "medio",
      data_ocorrencia: "2024-01-20",
      resolvido: false,
    },
  ]);

  const [novaEmergencia, setNovaEmergencia] = useState<Omit<Emergencia, "id">>({
    titulo: "",
    descricao: "",
    nivel: "baixo",
    data_ocorrencia: "",
    resolvido: false,
  });

  // Estados para Presença
  const [criancas] = useState<Crianca[]>([
    {
      id: 1,
      nome_completo: "João Silva Santos",
      idade: 8,
      nome_responsavel: "Maria Silva",
    },
    {
      id: 2,
      nome_completo: "Ana Paula Costa",
      idade: 6,
      nome_responsavel: "Carlos Costa",
    },
    {
      id: 3,
      nome_completo: "Pedro Oliveira",
      idade: 7,
      nome_responsavel: "Lucia Oliveira",
    },
  ]);

  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [dataPresenca, setDataPresenca] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Funções para Avisos
  const adicionarAviso = () => {
    if (novoAviso.titulo && novoAviso.conteudo) {
      const aviso: Aviso = {
        ...novoAviso,
        id: Date.now(),
        data_criacao: new Date().toISOString().split("T")[0],
      };
      setAvisos([...avisos, aviso]);
      setNovoAviso({ titulo: "", conteudo: "", tipo: "info", ativo: true });
    }
  };

  const removerAviso = (id: number) => {
    setAvisos(avisos.filter((aviso) => aviso.id !== id));
  };

  const toggleAvisoAtivo = (id: number) => {
    setAvisos(
      avisos.map((aviso) =>
        aviso.id === id ? { ...aviso, ativo: !aviso.ativo } : aviso
      )
    );
  };

  // Funções para Eventos
  const adicionarEvento = () => {
    if (novoEvento.nome && novoEvento.data) {
      const evento: Evento = {
        ...novoEvento,
        id: Date.now(),
      };
      setEventos([...eventos, evento]);
      setNovoEvento({
        nome: "",
        descricao: "",
        data: "",
        horario: "",
        local: "",
        responsavel: "",
      });
    }
  };

  const removerEvento = (id: number) => {
    setEventos(eventos.filter((evento) => evento.id !== id));
  };

  // Funções para Emergências
  const adicionarEmergencia = () => {
    if (novaEmergencia.titulo && novaEmergencia.descricao) {
      const emergencia: Emergencia = {
        ...novaEmergencia,
        id: Date.now(),
        data_ocorrencia:
          novaEmergencia.data_ocorrencia ||
          new Date().toISOString().split("T")[0],
      };
      setEmergencias([...emergencias, emergencia]);
      setNovaEmergencia({
        titulo: "",
        descricao: "",
        nivel: "baixo",
        data_ocorrencia: "",
        resolvido: false,
      });
    }
  };

  const removerEmergencia = (id: number) => {
    setEmergencias(emergencias.filter((emergencia) => emergencia.id !== id));
  };

  const toggleEmergenciaResolvida = (id: number) => {
    setEmergencias(
      emergencias.map((emergencia) =>
        emergencia.id === id
          ? { ...emergencia, resolvido: !emergencia.resolvido }
          : emergencia
      )
    );
  };

  // Funções para Presença
  const marcarPresenca = (criancaId: number, presente: boolean) => {
    const presencaExistente = presencas.find(
      (p) => p.crianca_id === criancaId && p.data === dataPresenca
    );

    if (presencaExistente) {
      setPresencas(
        presencas.map((p) =>
          p.crianca_id === criancaId && p.data === dataPresenca
            ? { ...p, presente }
            : p
        )
      );
    } else {
      setPresencas([
        ...presencas,
        { crianca_id: criancaId, data: dataPresenca, presente },
      ]);
    }
  };

  const obterPresenca = (criancaId: number): boolean => {
    const presenca = presencas.find(
      (p) => p.crianca_id === criancaId && p.data === dataPresenca
    );
    return presenca?.presente || false;
  };

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "importante":
        return "bg-orange-500";
      case "urgente":
        return "bg-red-500";
      case "alto":
        return "bg-red-500";
      case "critico":
        return "bg-red-700";
      case "medio":
        return "bg-yellow-500";
      case "baixo":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-gray-600">
          Gerencie avisos, eventos, emergências e presença das crianças
        </p>
      </div>

      <Tabs defaultValue="avisos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="avisos" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Avisos
          </TabsTrigger>
          <TabsTrigger value="eventos" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="emergencias" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Emergências
          </TabsTrigger>
          <TabsTrigger value="presenca" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Presença
          </TabsTrigger>
        </TabsList>

        {/* Aba Avisos */}
        <TabsContent value="avisos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Aviso</CardTitle>
              <CardDescription>
                Adicione um novo aviso para os responsáveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo-aviso">Título</Label>
                  <Input
                    id="titulo-aviso"
                    value={novoAviso.titulo}
                    onChange={(e) =>
                      setNovoAviso({ ...novoAviso, titulo: e.target.value })
                    }
                    placeholder="Digite o título do aviso"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-aviso">Tipo</Label>
                  <Select
                    value={novoAviso.tipo}
                    onValueChange={(value: any) =>
                      setNovoAviso({ ...novoAviso, tipo: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Informativo</SelectItem>
                      <SelectItem value="importante">Importante</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="conteudo-aviso">Conteúdo</Label>
                <Textarea
                  id="conteudo-aviso"
                  value={novoAviso.conteudo}
                  onChange={(e) =>
                    setNovoAviso({ ...novoAviso, conteudo: e.target.value })
                  }
                  placeholder="Digite o conteúdo do aviso"
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={adicionarAviso} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Aviso
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avisos Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {avisos.map((aviso) => (
                  <div key={aviso.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{aviso.titulo}</h3>
                        <Badge className={getBadgeColor(aviso.tipo)}>
                          {aviso.tipo}
                        </Badge>
                        {aviso.ativo && <Badge variant="outline">Ativo</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAvisoAtivo(aviso.id)}
                        >
                          {aviso.ativo ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removerAviso(aviso.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{aviso.conteudo}</p>
                    <p className="text-sm text-gray-400">
                      Criado em: {aviso.data_criacao}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Eventos */}
        <TabsContent value="eventos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Evento</CardTitle>
              <CardDescription>
                Adicione um novo evento para a comunidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-evento">Nome do Evento</Label>
                  <Input
                    id="nome-evento"
                    value={novoEvento.nome}
                    onChange={(e) =>
                      setNovoEvento({ ...novoEvento, nome: e.target.value })
                    }
                    placeholder="Digite o nome do evento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel-evento">Responsável</Label>
                  <Input
                    id="responsavel-evento"
                    value={novoEvento.responsavel}
                    onChange={(e) =>
                      setNovoEvento({
                        ...novoEvento,
                        responsavel: e.target.value,
                      })
                    }
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-evento">Data</Label>
                  <Input
                    id="data-evento"
                    type="date"
                    value={novoEvento.data}
                    onChange={(e) =>
                      setNovoEvento({ ...novoEvento, data: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horario-evento">Horário</Label>
                  <Input
                    id="horario-evento"
                    type="time"
                    value={novoEvento.horario}
                    onChange={(e) =>
                      setNovoEvento({ ...novoEvento, horario: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="local-evento">Local</Label>
                  <Input
                    id="local-evento"
                    value={novoEvento.local}
                    onChange={(e) =>
                      setNovoEvento({ ...novoEvento, local: e.target.value })
                    }
                    placeholder="Local do evento"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao-evento">Descrição</Label>
                <Textarea
                  id="descricao-evento"
                  value={novoEvento.descricao}
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, descricao: e.target.value })
                  }
                  placeholder="Descrição do evento"
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={adicionarEvento} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Evento
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventos.map((evento) => (
                  <div key={evento.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{evento.nome}</h3>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removerEvento(evento.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-2">{evento.descricao}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <p>
                        <strong>Data:</strong> {evento.data}
                      </p>
                      <p>
                        <strong>Horário:</strong> {evento.horario}
                      </p>
                      <p>
                        <strong>Local:</strong> {evento.local}
                      </p>
                      <p>
                        <strong>Responsável:</strong> {evento.responsavel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Emergências */}
        <TabsContent value="emergencias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nova Emergência</CardTitle>
              <CardDescription>
                Registre situações que requerem atenção especial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo-emergencia">Título</Label>
                  <Input
                    id="titulo-emergencia"
                    value={novaEmergencia.titulo}
                    onChange={(e) =>
                      setNovaEmergencia({
                        ...novaEmergencia,
                        titulo: e.target.value,
                      })
                    }
                    placeholder="Título da emergência"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel-emergencia">Nível</Label>
                  <Select
                    value={novaEmergencia.nivel}
                    onValueChange={(value: any) =>
                      setNovaEmergencia({ ...novaEmergencia, nivel: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixo">Baixo</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="critico">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-emergencia">Data da Ocorrência</Label>
                <Input
                  id="data-emergencia"
                  type="date"
                  value={novaEmergencia.data_ocorrencia}
                  onChange={(e) =>
                    setNovaEmergencia({
                      ...novaEmergencia,
                      data_ocorrencia: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao-emergencia">Descrição</Label>
                <Textarea
                  id="descricao-emergencia"
                  value={novaEmergencia.descricao}
                  onChange={(e) =>
                    setNovaEmergencia({
                      ...novaEmergencia,
                      descricao: e.target.value,
                    })
                  }
                  placeholder="Descreva a situação de emergência"
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={adicionarEmergencia} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Emergência
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergências Registradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencias.map((emergencia) => (
                  <div key={emergencia.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{emergencia.titulo}</h3>
                        <Badge className={getBadgeColor(emergencia.nivel)}>
                          {emergencia.nivel}
                        </Badge>
                        {emergencia.resolvido && (
                          <Badge variant="outline" className="bg-green-100">
                            Resolvido
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toggleEmergenciaResolvida(emergencia.id)
                          }
                        >
                          {emergencia.resolvido ? "Reabrir" : "Resolver"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removerEmergencia(emergencia.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{emergencia.descricao}</p>
                    <p className="text-sm text-gray-400">
                      Data: {emergencia.data_ocorrencia}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Presença */}
        <TabsContent value="presenca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Presença</CardTitle>
              <CardDescription>
                Marque a presença das crianças no culto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-presenca">Data do Culto</Label>
                <Input
                  id="data-presenca"
                  type="date"
                  value={dataPresenca}
                  onChange={(e) => setDataPresenca(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Lista de Crianças</h3>
                {criancas.map((crianca) => (
                  <div
                    key={crianca.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{crianca.nome_completo}</p>
                      <p className="text-sm text-gray-600">
                        {crianca.idade} anos - Responsável:{" "}
                        {crianca.nome_responsavel}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`presenca-${crianca.id}`}
                        checked={obterPresenca(crianca.id)}
                        onCheckedChange={(checked) =>
                          marcarPresenca(crianca.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`presenca-${crianca.id}`}>Presente</Label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Resumo da Presença</h4>
                <p>Data: {dataPresenca}</p>
                <p>
                  Presentes:{" "}
                  {
                    presencas.filter(
                      (p) => p.data === dataPresenca && p.presente
                    ).length
                  }
                </p>
                <p>Total de crianças: {criancas.length}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
