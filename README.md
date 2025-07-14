# Aplicativo de Controle de Lotes - LAB.CQ

Aplicativo React Native simples para registro e consulta de aprovação de lotes pelo Laboratório de Controle de Qualidade.

## Funcionalidades

- Cadastrar número do lote
- Registrar status (Aprovado/Reprovado)
- Visualizar histórico de lotes
- Armazenamento local com SQLite

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o aplicativo:
```bash
npm start
```

3. Use o Expo Go no seu celular para testar o app

## Estrutura do App

- **Tela principal**: Formulário para cadastro + lista de lotes
- **Banco de dados**: SQLite local para armazenar os dados
- **Interface**: Design simples e funcional

## Tecnologias utilizadas

- React Native
- Expo
- SQLite (expo-sqlite) 