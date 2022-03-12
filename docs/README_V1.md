# Minhas faltas do SIGA
Como um aluno bem aplicado, gostaria de gerenciar minhas faltas no SIGA de maneira rápida e eficiente. 

Como um desenvolvedor, gostaria de experimentar a experiência de uma extração e limpeza de dados da Web, e para tanto, estou usando o Pupperteer e Node.js

## Objetivos
- [x] Obter todos os dados referentes à faltas parciais
- [x] Limpeza dos dados que vem no HTML
- [ ] Refatoração do código (MVP1)
- [ ] Criação de API com Express (MVP2) 
- [ ] Disponibilizar a API no Heroku (MVP3)
- [ ] Elaborar forma de consumo de front end (MVP4)

## Iniciando
É importante que você:

- Tenha o Node.js instalado na versão v16.14.0 ou superior.
- Tenha o npm ou o yarn instalado para baixar as dependências.

### Arquivo de credenciais
Para o MVP1, crie um arquivo .env na raiz do projeto com os seguintes dados:

```
SIGA_USUARIO=
SIGA_SENHA=
```

### Instalando
```bash
# Clonando o repositório
$ https://github.com/rbmelolima/Minhas-Faltas-SIGA

# Navegue até ele e instale todas as dependências
$ npm i

# Crie o arquivo .env com suas credenciais

# Inicie a aplicação
$ npm start
```

## Exemplo de retorno
A seguir, um exemplo do objeto de faltas parciais do SIGA

```
{
  AGO005: {
    abbreviation: 'AGO005',
    name: 'Gestão de Projetos',
    presences: '4',
    absences: '0'
  },
  AGR101: {
    abbreviation: 'AGR101',
    name: 'Gestão de Equipes',
    presences: '2',
    absences: '0'
  },
  IBD100: {
    abbreviation: 'IBD100',
    name: 'Laboratório de Banco de Dados (Escolha 1)',
    presences: '0',
    absences: '0'
  },
  IES301: {
    abbreviation: 'IES301',
    name: 'Laboratório de Engenharia de Software',
    presences: '12',
    absences: '0'
  },
  ILP530: {
    abbreviation: 'ILP530',
    name: 'Eletiva - Linguagem de Programação III - Linguagem JAVA',
    presences: '8',
    absences: '0'
  },
  IRC008: {
    abbreviation: 'IRC008',
    name: 'Redes de Computadores',
    presences: '0',
    absences: '0'
  },
  ISG003: {
    abbreviation: 'ISG003',
    name: 'Segurança da Informação',
    presences: '4',
    absences: '0'
  },
  MPL001: {
    abbreviation: 'MPL001',
    name: 'Programação Linear e Aplicações',
    presences: '8',
    absences: '0'
  }
}
```

## Links
- [SIGA](https://siga.cps.sp.gov.br/aluno/login.aspx): Site institucional da Fatec feito para consumo dos alunos.