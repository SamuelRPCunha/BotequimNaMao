
# 🍹 Botequim na Mão

> **Projeto Integrador — Introdução à Programação Web**

O **Botequim na Mão** é um cardápio digital inteligente que resolve a frustração de pedir um drink que está em falta. A aplicação concilia o estoque real do estabelecimento (gerenciado pelo dono) com o catálogo de receitas, mostrando ao cliente apenas os drinks que são 100% possíveis de serem preparados naquele momento.

-----

## 🔗 Links

  - **Deploy (Vercel/Netlify/GitHub Pages):** https://samuelrpcunha.github.io/BotequimNaMao/
  - **Repositório:** https://github.com/SamuelRPCunha/BotequimNaMao.git

-----

## 📱 Funcionalidades

### Para o Cliente (Visitante)

  - **Visualização Dinâmica:** Listagem de drinks gerada via JavaScript.
  - **Filtro Inteligente:** Exibe apenas receitas cujos ingredientes estão em estoque.
  - **Busca e Categorias:** Filtragem por nome (barra de pesquisa) ou por tags (ex: Clássicos, Tropicais).
  - **Detalhes:** Visualização de ingredientes e descrição de cada drink.

### Para o Administrador (Dono)

  - **Gestão de Estoque:** Interface para marcar/desmarcar ingredientes disponíveis.
  - **Persistência:** O estoque salvo permanece o mesmo mesmo após recarregar a página (uso de `localStorage`).

-----

## 🛠️ Tecnologias Utilizadas

  - **HTML5:** Semântica e estrutura.
  - **CSS3:** Estilização responsiva (Mobile-First), Flexbox, CSS Grid e Variáveis CSS.
  - **JavaScript (Vanilla):** Lógica de programação, manipulação do DOM e consumo de dados.

-----

## ⚙️ Decisões Técnicas e Requisitos Atendidos

Este projeto foi desenvolvido atendendo aos seguintes requisitos técnicos da disciplina:

### 1\. Estruturas e Lógica

  - **Entidade Principal:** Objeto `Recipe` (representando o drink) e arrays de ingredientes.
  - **Métodos de Array:**
      - `.map()`: Utilizado para renderizar os cards na tela e as tags dos ingredientes.
      - `.filter()`: Utilizado na barra de pesquisa e nos botões de categoria.
      - `.every()`: A "mágica" do app. Verifica se **todos** os ingredientes da receita estão inclusos no array de estoque do bar.

### 2\. Assíncrono e Promises

  - **`fetch` com `async/await`:** Utilizado na inicialização (`init()`) para buscar o arquivo local `data/recipes.json`.
  - **`.then/.catch`:** *[Caso tenha implementado o modal de detalhes ou outra feature]* Utilizado para buscar detalhes adicionais ou tratamento secundário de erros.
  - **Loading e Erros:** Feedback visual ("Carregando...", "Erro ao carregar") exibido no DOM durante a requisição.

### 3\. DOM e Eventos

  - **Manipulação:** Criação dinâmica de nós HTML (`document.createElement` ou Template Strings) para listar os drinks.
  - **Eventos:** Uso de `addEventListener` com **Arrow Functions** para capturar cliques nos filtros, input de busca e gestão de estoque.

### 4\. Persistência de Dados (API HTML5)

  - **Web Storage (`localStorage`):** O array de ingredientes disponíveis no bar (`barStock`) é salvo no navegador. Isso permite que o dono defina o estoque e o cliente veja o cardápio atualizado em outra aba ou após um refresh.

### 5\. API HTML5 Opcional

  - **[ESCOLHA UMA E REMOVA AS OUTRAS]:**
      - **Clipboard API:** Botão para copiar a lista de ingredientes do drink.
      - **Audio API:** Efeito sonoro ao adicionar um item ao estoque.
      - **History API:** Navegação entre abas sem recarregar.

-----

## 📸 Screenshots

https://github.com/user-attachments/assets/37d54936-0c16-42bf-8ba4-dfd4d89bb874

-----

## 🚀 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SamuelRPCunha/BotequimNaMao.git
    ```
2.  **Entre na pasta:**
    ```bash
    cd BotequimNaMao
    ```
3.  **Execute:**
    Como o projeto utiliza `fetch` para ler um arquivo JSON local, é necessário rodar através de um servidor local para evitar erros de CORS.
      - Se usar VS Code: Instale a extensão **Live Server**, abra o `index.html` e clique em "Go Live".
      - Ou via Python: `python -m http.server`

-----

## ✅ Checklist de Conformidade

  - [ ] Estruturas básicas (condicionais, laços, funções).
  - [ ] Objetos + Arrays com map/filter/reduce (≥ 3 métodos).
  - [ ] Arrow functions (incluindo eventos).
  - [ ] DOM dinâmico (criação/remoção/atualização; formulários e eventos).
  - [ ] Requisição assíncrona com fetch + loading/erros.
  - [ ] Promises (.then/.catch) e async/await (try/catch).
  - [ ] Web Storage para persistência.
  - [ ] +1 API HTML5 opcional (File/Geolocation/History/Canvas/Audio/Video/Clipboard). *(Marque se implementou)*
  - [ ] Responsivo + semântica + acessibilidade básica.
  - [ ] Organização de arquivos e README completo.

-----

## 🤖 Declaração de Uso de IA

Conforme as diretrizes de integridade acadêmica, declaro o uso de ferramentas de IA (ChatGPT/Gemini) nas seguintes etapas:

1.  **Ideação e Design:** Auxílio na escolha da paleta de cores e geração de ideias para a logo.
2.  **Código CSS:** Apoio na construção de layouts complexos com CSS Grid e Flexbox (centralização e responsividade).
3.  **Depuração:** Auxílio para entender erros de lógica na conciliação dos arrays (`.filter` com `.every`).
4.  **Conteúdo:** Geração dos textos fictícios e lista de receitas para o arquivo JSON.

**Nota:** Toda a lógica de programação, estruturação do projeto e implementação final foram revisadas e compreendidas pelo autor.

-----

**Autor:** Samuel R. P. Cunha
**Disciplina:** Introdução à Programação Web
