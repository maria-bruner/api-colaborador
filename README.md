# API Colaboradores

API para gerenciamento de colaboradores, empresas e centros de custo.

## Estrutura do Projeto

O projeto utiliza:
- Node.js
- Sequelize como ORM
- SQLite como banco de dados
- Cron para processamento automático

## Como rodar o projeto

### Opção 1: Localmente

1. Clone o repositório:
```bash
git clone https://github.com/maria-bruner/api-colaborador.git
```


2. Instale as dependências:
```markdown:README.md
npm i
```


3. Configure as variáveis de ambiente - no arquivo `.env` na raiz do projeto, ajuste as seguintes variáveis:

```markdown:README.md
API_AUTH='Authorization'
JSESSION_ID='cookie'
API_URL = 'url da sua api'
CRON_SCHEDULE = '*/15 * * * *"  
```

4. Inicie o servidor:
```bash
npm start
```

### Opção 2: Docker

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-colaboradores.git
```

2. Configure as variáveis de ambiente - no arquivo `.env` na raiz do projeto, ajuste as seguintes variáveis:

```markdown:README.md
API_AUTH='Authorization'
JSESSION_ID='cookie'
API_URL = 'url da sua api'
CRON_SCHEDULE = '*/15 * * * *"  
```

3. Use docker-compose para subir a aplicação:
```bash
docker-compose up --build
```

## Cron Jobs

O sistema possui um schdeuler automatizado que roda a cada 15 minutos para processamento de dados. Para desenvolvimento/testes, você pode modificar o intervalo alterando a variável `CRON_SCHEDULE` no arquivo `.env`:

Exemplos de configuração:
- A cada minuto: `* * * * *`
- A cada 5 minutos: `*/5 * * * *`
- A cada 15 minutos: `*/15 * * * *`

## Banco de dados

O projeto utiliza SQLite como banco de dados. O arquivo do banco será criado automaticamente como `database.sqlite` na raiz do projeto.

## Observações importantes

- Configure todas as variáveis de ambiente antes da execução
- O arquivo `.env` não é versionado por segurança
- Os logs do cron podem ser acompanhados na pasta `logs` da sua aplicação.