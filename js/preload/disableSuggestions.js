(function() {
  // Este script é carregado antes de qualquer outro componente do navegador
  
  // Armazenar as funções originais para futura referência
  const originalRequire = window.require;
  
  // Substituir a função require para interceptar o carregamento de módulos
  window.require = function(modulePath) {
    // Permitir que os módulos essenciais carreguem normalmente
    const result = originalRequire(modulePath);
    
    // Interceptar e substituir os módulos de sugestões
    if (modulePath === 'searchbar/searchSuggestionsPlugin.js' ||
        modulePath === 'searchbar/placeSuggestionsPlugin.js' ||
        modulePath === 'searchbar/instantAnswerPlugin.js') {
      // Retornar uma versão falsa do módulo que não faz nada
      return {
        initialize: function() {
          // Função vazia que não registra o plugin
          console.log('Sugestões desativadas para: ' + modulePath);
        }
      };
    }
    
    // Para o módulo searchbarPlugins, substituir algumas funções
    if (modulePath === 'searchbar/searchbarPlugins.js') {
      // Preservar a função original, mas modificar comportamentos específicos
      result.run = function(text, input, inputFlags) {
        // Versão modificada que só executa plugins essenciais (não sugestões)
        const allowedPlugins = ['bangs', 'tabs', 'bookmarkManager', 'developmentModeNotification'];
        
        for (var i = 0; i < result.plugins.length; i++) {
          try {
            if (allowedPlugins.includes(result.plugins[i].name) && 
                result.plugins[i].showResults && 
                (!result.plugins[i].trigger || result.plugins[i].trigger(text))) {
              result.plugins[i].showResults(text, input, inputFlags);
            } else {
              result.reset(result.plugins[i].name);
            }
          } catch (e) {
            console.error('error in searchbar plugin "' + result.plugins[i].name + '":', e);
          }
        }
      };
    }
    
    return result;
  };
})();