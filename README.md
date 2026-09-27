<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/ccdb8e3f-1b9d-4af7-9dd6-942d21f25442" /><div align="center">

<img src="./assets/images/homepage.png" alt="Torque App" width="280"/>

# 🔧 Pitwall (ex-Torque) — Ford VIN Share App
OBS: fizemos um rebranding de Torque para Pitwall, visando consolidar a marca e a mudança de paradigma que estávamos propondo. Caso veja "Torque" sendo mencionado em algum lugar, saiba que é a "Pitwall" (nós).

**Solução mobile para monitoramento de VIN Share e retenção de clientes no pós-venda Ford**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo_SDK-52-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Expo Router](https://img.shields.io/badge/Expo_Router-v4-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.github.io/router/)
[![NHTSA API](https://img.shields.io/badge/API-NHTSA-003478?style=flat-square)](https://api.nhtsa.gov/)
[![FIAP](https://img.shields.io/badge/Challenge-Ford_+_FIAP_2026-ED1C24?style=flat-square)](https://www.fiap.com.br/)
[![Status](https://img.shields.io/badge/Sprint_3-Entrega_Final-00A86B?style=flat-square)]()

_Challenge Ford + FIAP 2026 | Mobile Development & IoT_

</div>

---

## Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Contexto e Problema](#-contexto-e-problema)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura e Fluxo](#-arquitetura-e-fluxo)
- [Tecnologias](#-tecnologias)
- [API Externa](#-api-externa-consumida)
- [Estrutura do Projeto](#️-estrutura-do-projeto)
- [Identidade Visual Ford](#-identidade-visual-ford)
- [Como Rodar](#-como-rodar)
- [Build de Produção (APK)](#-build-de-produção-apk)
- [Solução de Problemas](#️-solução-de-problemas)
- [Integrantes](#-integrantes)

---

## 🚗 Sobre o Projeto

O **Torque** é um aplicativo mobile desenvolvido para concessionárias e gerentes de pós-venda Ford. Ele centraliza indicadores de **VIN Share** (participação de serviços por veículo), gestão de frota e leads preditivos em uma única interface, permitindo que as equipes atuem proativamente na retenção de clientes antes que eles levem seus veículos à concorrência.

O app consome dados da **API pública da NHTSA** para exibir recalls ativos, histórico de revisões e decodificação de VIN em tempo real, conectando informações técnicas do veículo diretamente com o fluxo comercial da concessionária.

---

## Imagens do Projeto
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/b92b3130-0dd0-4cd3-83d5-1aa0649f7716" />
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/0103e523-59b5-4782-84d4-405ee2fab252" />
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/ae81c1cc-5ccb-47c0-a4b7-193e2ab63290" />
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/4296048c-86a6-4d62-8dd6-acb2178888e3" />
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/f2e84970-227e-4351-8b26-ad1cc8d422ad" />
<img width="634" height="1378" alt="image" src="https://github.com/user-attachments/assets/4bbe60c2-84f6-4179-b8e6-bd0a4e04b4e1" />



## Contexto e Problema

O VIN Share mede a proporção de serviços de um veículo realizados dentro da rede autorizada Ford. Uma queda nesse indicador sinaliza que o cliente está migrando para oficinas independentes — um problema crítico de pós-venda que resulta em:

- **Perda de receita** recorrente de revisões e peças originais
- **Ruptura do relacionamento** com o cliente
- **Menor rastreabilidade** do histórico do veículo
- **Recall não atendidos** por falta de contato ativo

O Torque endereça esse problema oferecendo **visibilidade em tempo real** e **geração automática de leads** para veículos com risco de abandono da rede.

---

## Funcionalidades

### Dashboard
Visão executiva com os principais KPIs da concessionária:
- VIN Share atual e variação percentual
- Receita do período com tendência
- Contagem de frota ativa monitorada
- Leads em aberto aguardando ação
- Mini gráficos de evolução histórica por métrica

### Frota
Gestão completa dos veículos cadastrados:
- Listagem com busca por placa, modelo ou proprietário
- Filtros por status (em dia, revisão próxima, risco de abandono)
- **Score de risco** calculado por tempo desde a última visita
- Acesso rápido ao detalhe de cada veículo

### Leads Preditivos
Motor de priorização de contatos:
- Leads gerados automaticamente por algoritmo de risco
- Classificação por urgência (alta / média / baixa)
- **Ação direta**: ligar ou abrir WhatsApp com um toque
- Histórico de tentativas de contato

### Alertas e Notificações
Central de avisos críticos:
- Recalls ativos por VIN (dados NHTSA em tempo real)
- Alertas de revisão programada vencida
- Notificações de garantia próxima do vencimento
- Avisos de risco calculado de perda do cliente
- Ativação de push notification local (via `expo-notifications`), com pedido de permissão nativo e disparo real no dispositivo

### Detalhe do Veículo
Ficha completa do veículo:
- Dados técnicos via decodificação do VIN
- Histórico de serviços na rede
- Status de recalls ativos e pendentes
- Informações de garantia (original e estendida)
- Próximas revisões recomendadas

---

## Arquitetura e Fluxo

```
┌──────────────────────────────────────────────────────┐
│                    Torque App                        │
│                                                      │
│  ┌─────────┐  ┌────────┐  ┌────────┐  ┌──────────┐ │
│  │Dashboard│  │ Frota  │  │ Leads  │  │ Alertas  │ │
│  └────┬────┘  └───┬────┘  └───┬────┘  └────┬─────┘ │
│       │           │           │             │        │
│       └───────────┴─────┬─────┴─────────────┘        │
│                         │                             │
│               ┌─────────▼──────────┐                 │
│               │   services/api.ts  │                 │
│               │  services/mock.ts  │                 │
│               └─────────┬──────────┘                 │
└─────────────────────────┼────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │     NHTSA Public API  │
              │    api.nhtsa.gov      │
              └───────────────────────┘
```

O app usa **Expo Router v4** com navegação baseada em arquivos. A camada de serviços abstrai chamadas à API NHTSA e os dados simulados (`mockData.ts`), tornando simples a substituição futura por uma API interna Ford.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.76.9 | Framework mobile |
| Expo SDK | ~52.0.0 | Plataforma e tooling |
| Expo Router | ~4.0.0 | Navegação file-based |
| TypeScript | ^5.3.3 | Tipagem estática |
| React | 18.3.1 | Biblioteca de UI |
| expo-notifications | ~0.29.0 | Push notifications locais (permissão + disparo real no dispositivo) |
| expo-font | ~13.0.0 | Fontes customizadas |
| react-native-svg | ^15.15.4 | Gráficos vetoriais |
| react-native-screens | ^4.24.0 | Otimização de navegação |
| react-native-safe-area-context | ^5.7.0 | Safe area handling |
| @expo/vector-icons (Ionicons) | via Expo | Ícones |

---

## API Externa Consumida

### NHTSA — National Highway Traffic Safety Administration

Base URL: `https://api.nhtsa.gov`

| Endpoint | Descrição |
|---|---|
| `GET /recalls/recallsByVIN?vin={vin}` | Recalls ativos para um VIN específico |
| `GET /recalls/recallsByVehicle?make=Ford&model={model}&modelYear={year}` | Recalls por modelo e ano |
| `GET /vehicles/decodevin/{vin}` | Decodificação completa do VIN (fabricante, modelo, motor, etc.) |

A API NHTSA é pública, gratuita e não requer autenticação. Documentação completa em [api.nhtsa.gov](https://api.nhtsa.gov).

> **Nota:** Os dados de frota, leads e métricas de VIN Share são simulados via `services/mockData.ts`, representando a integração futura com sistemas internos da Ford (ex: FordDirect, DMS da concessionária).

---

## Estrutura do Projeto

```
torque/
├── app/
│   ├── _layout.tsx              # Layout raiz (Stack Navigator)
│   ├── index.tsx                # Redirecionamento inicial → /login
│   ├── login.tsx                # Tela de autenticação
│   ├── vehicle-detail.tsx       # Tela de detalhe do veículo
│   └── (tabs)/
│       ├── _layout.tsx          # Tab Navigator com identidade Ford
│       ├── index.tsx            # Dashboard (VIN Share, métricas)
│       ├── vehicles.tsx         # Frota com busca e filtros
│       ├── leads.tsx            # Leads preditivos
│       └── notifications.tsx    # Central de alertas
├── components/
│   ├── MetricCard.tsx           # Card de KPI com mini gráfico
│   ├── MiniBarChart.tsx         # Gráfico de barras inline (SVG)
│   ├── VehicleCard.tsx          # Card de veículo com score de risco
│   └── LeadCard.tsx             # Card de lead com ações (ligar/WhatsApp)
├── constants/
│   └── Colors.ts                # Paleta de cores Ford
├── services/
│   ├── api.ts                   # Integração com NHTSA API
│   └── mockData.ts              # Dados simulados (frota, leads, métricas)
├── types/
│   └── index.ts                 # Tipos TypeScript globais
├── assets/
│   └── images/                  # Imagens e ícones (logo, splash, adaptive icon)
├── app.json                     # Configuração Expo (nome, ícone, splash)
├── eas.json                     # Perfis de build (preview APK / production AAB)
├── babel.config.js              # Configuração Babel
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências e scripts
```

---

## Como Rodar

### Pré-requisitos

| Ferramenta | Versão mínima | Instalação |
|---|---|---|
| Node.js | 18.x ou superior | [nodejs.org](https://nodejs.org/) |
| npm | 9.x ou superior | Incluso no Node.js |
| Git | qualquer | [git-scm.com](https://git-scm.com/) |
| Expo Go | última versão | [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) |

### 1. Clonar o repositório

```bash
git clone https://github.com/Challenge-Ford/pitwall-app
cd pitwall-app
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npx expo start
```

### 4. Abrir no dispositivo

| Plataforma | Como abrir |
|---|---|
| **Celular físico** | Abra o **Expo Go** e escaneie o QR Code exibido no terminal |
| **Android (emulador)** | Pressione `a` no terminal |
| **iOS (simulador Mac)** | Pressione `i` no terminal |
| **Web (browser)** | Pressione `w` no terminal |

> Para celular físico, certifique-se que o dispositivo está na **mesma rede Wi-Fi** que o computador.

---

## 📦 Build de Produção (APK)

O build final e instalável (`.apk`) é gerado com o **EAS Build**, serviço de build na nuvem da Expo — não depende de Android Studio local.

### 1. Instalar a CLI e logar

```bash
npm install -g eas-cli
eas login
```

### 2. Vincular o projeto (primeira vez apenas)

```bash
eas init
```

### 3. Gerar o APK

```bash
eas build -p android --profile preview
```

O perfil `preview` (definido em `eas.json`) gera um `.apk` de distribuição interna — pronto para instalar direto no aparelho, sem passar pela Play Store. Ao final do build, a EAS retorna um link de download do `.apk`.

### 4. Instalar no dispositivo físico ou emulador

- **Físico:** baixe o `.apk` pelo link (ou escaneie o QR Code que a CLI mostra) e instale normalmente.
- **Emulador Android:** com o emulador aberto, `eas build:run -p android` instala o último build automaticamente.

> Para gerar o `.aab` de publicação na Play Store, use `eas build -p android --profile production`.

---

## 🛠️ Solução de Problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| `npm install` falha com erro de peer dependency (`expo-constants`/`expo-router`) | Versões de pacote fora da faixa do Expo SDK instalado | Rode `npx expo install --check` e aceite as versões sugeridas, ou confira se seu `package.json` está alinhado ao SDK 52 |
| Metro trava ou a tela fica em branco no primeiro `expo start` | Cache do bundler corrompido | `npx expo start -c` (limpa o cache do Metro) |
| App não conecta pelo Expo Go em celular físico | Celular e computador em redes Wi-Fi diferentes | Coloque ambos na mesma rede, ou use `npx expo start --tunnel` |
| Recalls não aparecem na Ficha do Veículo | API pública da NHTSA fora do ar ou VIN sem recall cadastrado | A tela já trata o erro silenciosamente e mostra "Nenhum recall encontrado"; teste com outro VIN da lista mockada |
| Notificação push não dispara | Permissão negada no sistema ou testado no navegador (web) | Notificações locais só funcionam em iOS/Android; reative a permissão do app nas configurações do aparelho |
| `eas build` pede login toda vez | Sessão da Expo CLI expirada | Rode `eas login` novamente; `eas whoami` confirma o usuário logado |

---

## Integrantes

| Nome | RM | 
|---|---|
| Arthur Cotrick Pagani | RM554510 |
| Diogo Leles Franciulli | RM558487 |
| Felipe Sousa de Oliveira | RM559085 | 
| Ryan Brito Pereira Ramos | RM554497 | 
| Vitor Chaves | RM557067 | 
