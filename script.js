document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  
  // Verifica em qual página estamos para rodar o script correto
  if (document.getElementById('page-login')) {
    initLogin();
  }
  
  if (document.getElementById('page-cardapio')) {
    initCardapio();
  }

  if (document.getElementById('page-gestao')) {
    initGestao();
  }
});

/* ================= HELPER: DATA FETCHING ================= */
async function fetchRecipes() {
  const localData = localStorage.getItem('botequim_recipes');
  if (localData) {
    return JSON.parse(localData);
  }
  
  const res = await fetch('data/recipes.json');
  const data = await res.json();
  localStorage.setItem('botequim_recipes', JSON.stringify(data));
  return data;
}

/* ================= HEADER LOGIC ================= */
function initHeader() {
  const session = JSON.parse(localStorage.getItem('botequim_session'));
  const navContainer = document.querySelector('.nav');
  
  if (navContainer) {
    if (session) {
      navContainer.innerHTML = `
        <span style="color: var(--cor-subtitulo); margin-right: 1rem;">Olá, ${session.name.split(' ')[0]}</span>
        <button id="btn-logout" class="button_login">Sair</button>
      `;
      
      document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('botequim_session');
        window.location.reload();
      });
    } else {
      // Se não estiver logado, mantém o link original do HTML
    }
  }
}

/* ================= LOGIN LOGIC ================= */
function initLogin() {
  const form = document.getElementById('form-login');
  const title = document.getElementById('login-title');
  const subtitle = document.getElementById('login-subtitle');
  const btnSubmit = document.getElementById('btn-submit');
  const toggleText = document.getElementById('toggle-text');
  const toggleBtn = document.getElementById('toggle-btn');
  const nameGroup = document.getElementById('group-name');
  
  // Modal Elements
  const modal = document.getElementById('modal');
  const modalMsg = document.getElementById('modal-msg');
  const modalBtn = document.getElementById('modal-btn');
  let modalAction = null;

  let isLogin = true;

  // Toggle Login/Cadastro
  toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    
    if (isLogin) {
      title.textContent = 'Acesse sua conta';
      subtitle.textContent = 'Bem-vindo de volta! Por favor, insira seus dados.';
      btnSubmit.textContent = 'Entrar';
      toggleText.textContent = 'Não tem uma conta?';
      toggleBtn.textContent = 'Cadastre-se';
      nameGroup.style.display = 'none';
      document.getElementById('input-name').required = false;
    } else {
      title.textContent = 'Crie sua conta';
      subtitle.textContent = 'Preencha os dados abaixo para começar.';
      btnSubmit.textContent = 'Cadastrar';
      toggleText.textContent = 'Já tem uma conta?';
      toggleBtn.textContent = 'Entrar';
      nameGroup.style.display = 'flex';
      document.getElementById('input-name').required = true;
    }
  });

  // Modal Logic
  function showModal(msg, action = null) {
    modalMsg.textContent = msg;
    modal.classList.add('active');
    modalAction = action;
  }

  modalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    if (modalAction) modalAction();
  });

  // Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;

    if (isLogin) {
      // Lógica de Admin
      if (email === 'admin' && password === 'admin') {
        const adminUser = { name: 'Administrador', email: 'admin', role: 'admin' };
        localStorage.setItem('botequim_session', JSON.stringify(adminUser));
        showModal('Login de Administrador realizado!', () => window.location.href = 'gestao.html');
        return;
      }

      const users = JSON.parse(localStorage.getItem('botequim_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('botequim_session', JSON.stringify(user));
        showModal(`Bem-vindo(a), ${user.name}!`, () => window.location.href = 'index.html');
      } else {
        showModal('E-mail ou senha incorretos.');
      }
    } else {
      if (!name || !email || !password) {
        showModal('Preencha todos os campos.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('botequim_users') || '[]');
      if (users.some(u => u.email === email)) {
        showModal('Este e-mail já está cadastrado.');
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('botequim_users', JSON.stringify(users));
      localStorage.setItem('botequim_session', JSON.stringify(newUser));
      
      showModal('Conta criada com sucesso!', () => window.location.href = 'index.html');
    }
  });
}

/* ================= GESTAO LOGIC (ADMIN) ================= */
function initGestao() {
  const container = document.getElementById('stock-container');
  const btnLogout = document.getElementById('btn-logout-admin');
  
  const containerDrinks = document.getElementById('drinks-list-container');
  const tabStock = document.getElementById('tab-stock');
  const tabDrinks = document.getElementById('tab-drinks');
  const contentStock = document.getElementById('content-stock');
  const contentDrinks = document.getElementById('content-drinks');
  
  // Elementos do Modal de Adicionar
  const btnOpenAdd = document.getElementById('btn-open-add-drink');
  const modalAdd = document.getElementById('modal-add-drink');
  const btnCancelAdd = document.getElementById('btn-cancel-add');
  const formAdd = document.getElementById('form-add-drink');
  const modalMsg = document.getElementById('modal'); // Reutilizando modal de mensagem

  // Verifica se é admin
  const session = JSON.parse(localStorage.getItem('botequim_session'));
  if (!session || session.role !== 'admin') {
    window.location.href = 'login.html';
    return;
  }

  // Logout Admin
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('botequim_session');
      window.location.href = 'index.html';
    });
  }

  // Lógica de Abas
  if (tabStock && tabDrinks) {
    tabStock.addEventListener('click', () => {
      tabStock.classList.add('active');
      tabDrinks.classList.remove('active');
      contentStock.style.display = 'block';
      contentDrinks.style.display = 'none';
    });

    tabDrinks.addEventListener('click', () => {
      tabDrinks.classList.add('active');
      tabStock.classList.remove('active');
      contentStock.style.display = 'none';
      contentDrinks.style.display = 'block';
      fetchRecipes().then(data => renderDrinksManagement(data));
    });
  }

  // Carrega receitas
  fetchRecipes().then(data => {
    renderStockManagement(data);
    renderDrinksManagement(data);
  });

  // Lógica do Modal de Adicionar
  if (btnOpenAdd) {
    btnOpenAdd.addEventListener('click', () => {
      modalAdd.classList.add('active');
    });
  }

  if (btnCancelAdd) {
    btnCancelAdd.addEventListener('click', () => {
      modalAdd.classList.remove('active');
      formAdd.reset();
    });
  }

  if (formAdd) {
    formAdd.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('new-name').value;
      const desc = document.getElementById('new-desc').value;
      const ingredientsStr = document.getElementById('new-ingredients').value;
      
      // Processa os dados
      const ingredientsList = ingredientsStr.split(',').map(i => i.trim()).filter(i => i);
      const recipes = await fetchRecipes();
      
      const newRecipe = {
        id: Date.now(),
        name: name,
        description: desc,
        image: 'images/geral/header/logo_botequim_na_mao_1.png', // Imagem padrão
        tags: ['Novidade'],
        ingredientsNeeded: ingredientsList
      };

      recipes.push(newRecipe);
      localStorage.setItem('botequim_recipes', JSON.stringify(recipes));
      
      // Atualiza a lista de gestão
      renderStockManagement(recipes);
      renderDrinksManagement(recipes);
      
      // Fecha modal e limpa
      modalAdd.classList.remove('active');
      formAdd.reset();
      alert('Bebida adicionada com sucesso!');
    });
  }

  function renderStockManagement(receitas) {
    // Extrair todos os ingredientes únicos
    const todosIngredientes = new Set();
    receitas.forEach(r => r.ingredientsNeeded.forEach(ing => todosIngredientes.add(ing)));
    const ingredientesOrdenados = Array.from(todosIngredientes).sort();

    // Carregar estoque atual (ou iniciar com todos se vazio)
    let currentStock = JSON.parse(localStorage.getItem('botequim_stock'));
    if (!currentStock) {
      currentStock = ingredientesOrdenados; // Padrão: tudo disponível
      localStorage.setItem('botequim_stock', JSON.stringify(currentStock));
    }

    container.innerHTML = '';
    
    ingredientesOrdenados.forEach(ing => {
      const item = document.createElement('div');
      item.className = 'stock-item';
      const isChecked = currentStock.includes(ing);

      item.innerHTML = `
        <span>${ing}</span>
        <label class="switch">
          <input type="checkbox" value="${ing}" ${isChecked ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
      `;

      // Evento de mudança
      const checkbox = item.querySelector('input');
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          currentStock.push(ing);
        } else {
          currentStock = currentStock.filter(i => i !== ing);
        }
        // Remove duplicatas e salva
        currentStock = [...new Set(currentStock)];
        localStorage.setItem('botequim_stock', JSON.stringify(currentStock));
      });

      container.appendChild(item);
    });
  }

  function renderDrinksManagement(receitas) {
    if (!containerDrinks) return;
    containerDrinks.innerHTML = '';

    receitas.forEach(receita => {
      const item = document.createElement('div');
      item.className = 'stock-item';
      
      item.innerHTML = `
        <span>${receita.name}</span>
        <button class="btn-delete" style="color: red; background: none; border: none; cursor: pointer;" title="Remover Bebida">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      `;

      item.querySelector('.btn-delete').addEventListener('click', async () => {
        if (confirm(`Tem certeza que deseja remover "${receita.name}"?`)) {
          const currentRecipes = await fetchRecipes();
          const updatedRecipes = currentRecipes.filter(r => r.id !== receita.id);
          localStorage.setItem('botequim_recipes', JSON.stringify(updatedRecipes));
          
          renderDrinksManagement(updatedRecipes);
          renderStockManagement(updatedRecipes); // Atualiza lista de ingredientes se necessário
        }
      });

      containerDrinks.appendChild(item);
    });
  }
}

/* ================= CARDAPIO LOGIC ================= */
function initCardapio() {
  const container = document.getElementById('cards-container');
  const inputBusca = document.getElementById('input-busca');
  const btnToggleFiltro = document.getElementById('btn-toggle-filtro');
  const areaFiltro = document.getElementById('area-filtro');
  const listaIngredientesContainer = document.getElementById('lista-ingredientes');
  const btnLimpar = document.getElementById('btn-limpar-filtros');

  let allRecipes = [];
  let selectedIngredients = [];

  // Toggle Filtro
  btnToggleFiltro.addEventListener('click', () => {
    areaFiltro.classList.toggle('ativo');
  });

  // Busca por nome
  inputBusca.addEventListener('input', () => {
    applyFilters();
  });

  // Limpar filtros
  btnLimpar.addEventListener('click', () => {
    selectedIngredients = [];
    document.querySelectorAll('.btn-ingrediente').forEach(btn => btn.classList.remove('ativo'));
    applyFilters();
  });

  fetchRecipes().then(data => {
      allRecipes = data;
      generateIngredientButtons(data);
      renderCards(allRecipes);
    })
    .catch(err => {
      container.innerHTML = '<p style="text-align:center; width:100%;">Erro ao carregar receitas.</p>';
      console.error(err);
    });

  function generateIngredientButtons(receitas) {
    // Extrair ingredientes únicos
    const todosIngredientes = new Set();
    receitas.forEach(r => r.ingredientsNeeded.forEach(ing => todosIngredientes.add(ing)));
    
    const ingredientesOrdenados = Array.from(todosIngredientes).sort();

    listaIngredientesContainer.innerHTML = '';
    ingredientesOrdenados.forEach(ing => {
      const btn = document.createElement('button');
      btn.className = 'btn-ingrediente';
      btn.textContent = ing;
      
      btn.addEventListener('click', () => {
        btn.classList.toggle('ativo');
        if (selectedIngredients.includes(ing)) {
          selectedIngredients = selectedIngredients.filter(i => i !== ing);
        } else {
          selectedIngredients.push(ing);
        }
        applyFilters();
      });

      listaIngredientesContainer.appendChild(btn);
    });
  }

  function applyFilters() {
    const termoBusca = inputBusca.value.toLowerCase();

    const filtrados = allRecipes.filter(receita => {
      // Filtro por Nome
      const matchNome = receita.name.toLowerCase().includes(termoBusca);
      
      // Filtro por Ingredientes (A bebida deve conter TODOS os ingredientes selecionados)
      const matchIngredientes = selectedIngredients.every(sel => 
        receita.ingredientsNeeded.includes(sel)
      );

      return matchNome && matchIngredientes;
    });

    renderCards(filtrados);
  }

  function renderCards(receitas) {
    container.innerHTML = '';

    if (receitas.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--cor-subtitulo2);">Nenhum drink encontrado com esses critérios.</p>';
      return;
    }
    
    receitas.forEach(receita => {
      const card = document.createElement('div');
      card.className = 'cards_bebidas';
      
      // Gera as tags de ingredientes
      const ingredientesHTML = receita.ingredientsNeeded.map(ing => 
        `<span class="tag-ingrediente">${ing}</span>`
      ).join('');

      card.innerHTML = `
        <div class="card_imagem">
          <img src="${receita.image}" alt="${receita.name}" />
        </div>
        <div class="section_card">
          <h2>${receita.name}</h2>
          <p>${receita.description}</p>
          <h2>Ingredientes:</h2>
        </div>
        <div class="section_card_ingredientes">
          ${ingredientesHTML}
        </div>
      `;
      container.appendChild(card);
    });
  }
}