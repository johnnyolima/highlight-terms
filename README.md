# 🖍️ Highlight Terms Script

Script em JavaScript para destacar múltiplos termos em uma página web, mesmo contendo caracteres especiais, acentos e parênteses.

## 🚀 Como usar

1. Abra a página que deseja pesquisar.
2. Abra o console do navegador (F12 > Console).
3. Cole o código do `highlight-terms.js` e pressione Enter.
4. Todos os termos serão destacados em amarelo tipo marcador, e o total de ocorrências aparecerá na tela e no console.

## ⚙️ Personalização

- Edite o array `termos` no início do script:
```js
let termos = ["termo1", "termo2", "termo3"];
```
- A cor do destaque pode ser alterada em:
```js
backgroundColor: "#fff176";
```

## ✅ Características

- Destaca todos os termos da lista, incluindo acentos, parênteses e sinais especiais.
- Pode ser executado várias vezes sem gerar erros.
- Mostra total de ocorrências e tempo de execução.

## 📄 Licença

MIT License © Johnny Lima
