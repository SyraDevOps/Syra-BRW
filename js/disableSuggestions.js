document.addEventListener('DOMContentLoaded', function() {
  // 1. Aplicar CSS para ocultar elementos de sugestão
  const style = document.createElement('style');
  style.innerHTML = `
    .searchbar-plugin-container {
      display: none !important;
    }
    .top-answer-area {
      display: none !important;
    }
    #searchbar {
      max-height: 44px !important;
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);
  
  // 2. Sobrescrever as funções principais que mostram sugestões
  if (window.searchbarPlugins) {
    // Substituir a função de execução de plugins
    const originalRun = window.searchbarPlugins.run;
    window.searchbarPlugins.run = function() {};
    
    // Substituir funções que adicionam resultados
    window.searchbarPlugins.addResult = function() {};
    window.searchbarPlugins.setTopAnswer = function() {};
    window.searchbarPlugins.showResults = function() {};
    
    // Limpar qualquer resultado existente
    window.searchbarPlugins.clearAll();
  }
  
  // 3. Interceptar qualquer chamada futura para registrar plugins
  Object.defineProperty(window, 'searchbarPlugins', {
    get: function() {
      return {
        register: function() {},
        reset: function() {},
        clearAll: function() {},
        addResult: function() {},
        setTopAnswer: function() {},
        run: function() {},
        getContainer: function() { return document.createElement('div'); }
      };
    },
    configurable: false
  });
  
  // 4. Desativar APIs de sugestão no motor de busca
  if (window.searchEngine) {
    for (let engine in window.searchEngine) {
      if (window.searchEngine[engine] && window.searchEngine[engine].suggestionsURL) {
        window.searchEngine[engine].suggestionsURL = null;
      }
    }
  }
  
  console.log("Sugestões de pesquisa desativadas permanentemente");
});