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
import { Checkbox } from "app/components/ui/checkbox";
import { Separator } from "app/components/ui/separator";
import type { Route } from "./+types/onboarding";

import { useFetcher } from "react-router";
import { createChild } from "~/api/children";
import { db } from "~/api/database";

import { getUserId } from "~/api/account/get-current-user";
import { finishOnboarding } from "~/api/account/finish-onboarding";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = await getUserId(request);
  const data: any = {
    full_name: formData.get("nome_completo") as string,
    age: Number(formData.get("idade")),
    authorize_bathroom_help: formData.get("autoriza_ajuda_banheiro") === "on",
    goes_to_bathroom_alone: formData.get("vai_banheiro_sozinho") === "on",
    user_id: userId,
    parent_phone: formData.get("telefone_responsavel") as string,
    food_restrictions: formData.get("restricoes_alimentares") as string,
    known_allergies: formData.get("alergias_conhecidas") as string,
    image_authorization: formData.get("autorizacao_imagem") === "on",
    additional_notes: formData.get("observacoes_adicionais") as string,
  };

  await createChild(db, data);

  const errorData = await finishOnboarding(db, userId!);

  if (errorData?.error) {
    return {
      success: false,
      message: "Erro ao finalizar o cadastro.",
      error: errorData.error,
    };
  }

  return {
    success: true,
    error: null,
  };
}

export default function FormularioCadastroCrianca() {
  let fetcher = useFetcher();
  const isSending = fetcher.state !== "idle";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Formulário de Cadastro da Criança</CardTitle>
          <CardDescription>
            Por favor, preencha todas as informações necessárias para o cadastro
            do seu filho(a).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fetcher.Form
            method="post"
            action="/onboarding"
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações da Criança</h3>

              <div className="space-y-2">
                <Label htmlFor="nome_completo">Nome Completo *</Label>
                <Input
                  id="nome_completo"
                  type="text"
                  name="nome_completo"
                  placeholder="Digite o nome completo da criança"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade">Idade *</Label>
                <Input
                  id="idade"
                  type="number"
                  min="0"
                  max="18"
                  name="idade"
                  placeholder="Digite a idade da criança"
                  required
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Seção Informações do Responsável */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Informações do Responsável
              </h3>

              <div className="space-y-2">
                <Label htmlFor="telefone_responsavel">
                  Telefone do Responsável *
                </Label>
                <Input
                  id="telefone_responsavel"
                  type="number"
                  name="telefone_responsavel"
                  placeholder="Digite o telefone (ex: 48 99999-9999)"
                  required
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações de Cuidados</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vai_banheiro_sozinho"
                  name="vai_banheiro_sozinho"
                />
                <Label htmlFor="vai_banheiro_sozinho">
                  A criança vai ao banheiro sozinha
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoriza_ajuda_banheiro"
                  name="autoriza_ajuda_banheiro"
                />
                <Label htmlFor="autoriza_ajuda_banheiro">
                  Autorizo a equipe a auxiliar meu filho(a) com necessidades do
                  banheiro, se necessário
                </Label>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Seção Informações de Saúde */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações de Saúde</h3>

              <div className="space-y-2">
                <Label htmlFor="restricoes_alimentares">
                  Restrições Alimentares
                </Label>
                <Textarea
                  id="restricoes_alimentares"
                  name="restricoes_alimentares"
                  placeholder="Liste qualquer restrição alimentar ou necessidade dietética especial"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alergias_conhecidas">Alergias Conhecidas</Label>
                <Textarea
                  id="alergias_conhecidas"
                  name="alergias_conhecidas"
                  placeholder="Liste qualquer alergia conhecida e sua gravidade"
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Seção Autorizações */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Autorizações</h3>

              <div className="flex items-center space-x-2">
                <Checkbox id="autorizacao_imagem" name="autorizacao_imagem" />
                <Label htmlFor="autorizacao_imagem">
                  Autorizo o uso da imagem do meu filho(a)
                </Label>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Seção Observações Adicionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Adicionais</h3>

              <div className="space-y-2">
                <Label htmlFor="observacoes_adicionais">
                  Observações Adicionais
                </Label>
                <Textarea
                  id="observacoes_adicionais"
                  name="observacoes_adicionais"
                  placeholder="Qualquer informação adicional que gostaria que soubéssemos sobre seu filho(a)"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Botão de Envio */}
            <div className="pt-4">
              <Button type="submit" className="w-full">
                {isSending ? "Enviando..." : "Enviar Cadastro"}
              </Button>
            </div>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
}
