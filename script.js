// Seleciona o tbody
const productList = document.getElementById("product-list");

const Url_base = "https://gerenciador-estoque-back-end-leos-projects-97658901.vercel.app/"

const form = document.getElementById("productForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Capturar os valores dos campos
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;

  // Criar o objeto JSON
  const product = {
    nome: name,
    quantidade: parseInt(quantity, 10), // Converte para número
  };

  console.log("JSON criado:", product);

  // Enviar o JSON para o back-end
  try {
    const response = await fetch(`${Url_base}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Produto enviado com sucesso:", data);
    } else {
      console.error("Erro ao enviar produto:", response.status);
    }
  } catch (error) {
    console.error("Erro ao conectar com o back-end:", error);
  }

  renderProducts()
  
});

// Função para renderizar a lista de produtos
async function renderProducts() {
    try {
        const response = await fetch(`${Url_base}/produtos`); // Faz a requisição ao backend
        const products = await response.json(); // Converte a resposta para JSON
        
        productList.innerHTML = ""; // Limpa a tabela

        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.quantidade}</td>
                <td>
                    <button id="add_button" onclick="adicionarProduct('${product._id}', true)">+</button>
                    <button id="rem_button" onclick="adicionarProduct('${product._id}', false)">-</button>
                    <button onclick="deleteProduct('${product._id}')">Deletar</button>
                </td>
            `
            productList.appendChild(row);
        })
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

async function deleteProduct(id){
  try{
    const response = await fetch(`${Url_base}/produtos/${id}`, {method: 'DELETE'})
    console.log(response)
    renderProducts()
  }catch(err){
    console.log("error")
  }
}

async function adicionarProduct(id, metodo){
  try{
    const response = await fetch(`${Url_base}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metodo: metodo
      }),
    })
    console.log(response)
    renderProducts()
  }catch(err){
    console.log("error")
  }
  
}


// Renderiza a lista ao carregar a página
renderProducts()
