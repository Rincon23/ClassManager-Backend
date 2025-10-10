# 📘 Descritivo do Trabalho – Desenvolvimento Framework II

## 🎯 Objetivo
Desenvolver uma API backend em Javascript para um sistema Web.  
O grupo poderá:

- Reutilizar o site desenvolvido no trabalho do semestre passado criando a camada de backend  
- Ou criar um novo módulo complementar ao site desenvolvido durante o semestre, disponível em (ver sugestões abaixo de módulos para o site.):  
  👉 [https://github.com/fernandodomeneghetti/devops-turma-a](https://github.com/fernandodomeneghetti/devops-turma-a)

---

## 🧩 Requisitos Técnicos

### Tecnologias obrigatórias:
- Javascript  
- Sequelize ou TypeORM  
- JWT (para autenticação)  
- Swagger (para documentação da API)

### Infraestrutura e integração:
- API e frontend publicados via GitHub Actions (Continuous Deployment).  
- Utilização de containers (Docker) para rodar a aplicação e o banco de dados.  
- O frontend deve se comunicar com a API, realizando cadastros e leituras.  
- Todas as requisições devem exigir autenticação via token JWT.

---

## 📂 Entregáveis
Repositório privado no GitHub, contendo:

- Código-fonte da API e do frontend.  
- Documentação no README.md, incluindo:
  - Descrição do projeto e proposta do sistema.  
  - Instruções para execução local.  
  - Swagger atualizado e acessível para testes durante a apresentação.

---

## 📆 Entrega e Apresentação
**Data:** 03/11 (segunda-feira)  
**Formato:** Apresentação presencial  
**Tempo por grupo:** até 10 minutos

Durante a apresentação:
- Demonstração do site consumindo a API.  
- Demonstração da API no Swagger.  
- O professor solicitará um cadastro ao vivo via Swagger, que deverá refletir no site imediatamente.

---

## 🧑‍🤝‍🧑 Grupos
Cada grupo deve ter até 5 integrantes.  
Todos os membros devem participar da explicação ou execução durante a apresentação.

---

## ✅ Critérios de Avaliação

| Critério | Descrição |
|-----------|------------|
| **Funcionalidade da API** | CRUD completo, autenticação JWT, rotas documentadas no swagger. |
| **Integração** | Comunicação efetiva entre site e API. |
| **Containers** | Uso de Docker para ambiente padronizado. |
| **Documentação** | README e Swagger completos e claros. |
| **Participação** | Engajamento equilibrado de todos os integrantes. |

---

## 💡 Sugestões de Temas / Módulos
Os grupos podem escolher qualquer módulo complementar ao site do semestre anterior.  
**Sugestões:**
- Cadastro e gerenciamento de professores – CRUD de docentes, vinculação a disciplinas e horários.  
- Cadastro de laboratórios e agendamento de uso – controle de reservas, disponibilidade e capacidade.  
- Sistema de turmas e matrículas – vincular alunos, professores e disciplinas.  
- Controle de presença e frequência – registro e consulta de presenças por turma.  
- Módulo de avaliações e notas – cadastro de provas, notas e médias automáticas.  
- Gestão de recursos e equipamentos – inventário de equipamentos, manutenção e status.  
- Módulo de comunicação interna – mensagens entre alunos, professores e administração (ex: mural de avisos ou chat simples).
