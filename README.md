-- Ferramentas Utilizadas

- Phosphor react
- React Router Dom
- Styled Componentes
- Validação de formulários
- React hookForm
- Zod (validação de formulários)
- npm i @hookform/resolvers - lib para integrar o react hookform com o zod
- date-fns
- Use Effect

  -- Anotações

  - FORMS
    -- controled
    quando o que o usuário digita fica armazenado no estado
    monitorando a cada interação do usuário

  -- uncontroled
  o valor do input só é buscado quando necessário

  -- PROP DRILLING
  quando precisamos de muitas propriedades apenas para comunicação entre componentes

  -- CONTEXT API
  permite compartilharmos informçaões entre vários componentes ao mesmo tempo

  -- Não enviar a função set(de alterar estados) pelo contexto. Criar uma função e armazenar o set e enviar a função pelo contexto
