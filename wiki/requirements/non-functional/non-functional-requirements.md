# Requisitos Não Funcionais

## [RNF001] Desempenho

### Descrição
O sistema deve garantir um desempenho rápido e responsivo, especialmente durante o carregamento de modelos .obj, independentemente do tamanho do arquivo ou da presença de texturas adicionais.

### Critérios de Aceitação
1. O tempo de carregamento de modelos .obj não deve exceder 5 segundos, em média.
2. O sistema deve ser capaz de lidar com picos de carga de usuários sem degradação significativa do desempenho.

### Prioridade
Alta

## [RNF002] Segurança

### Descrição
O sistema deve garantir a segurança dos dados dos usuários e dos modelos carregados, protegendo contra acesso não autorizado e manipulação indevida.

### Critérios de Aceitação
1. A autenticação de usuários deve ser realizada de forma segura, com criptografia de senhas e tokens de autenticação.
2. Os modelos carregados devem ser armazenados de forma segura no banco de dados MongoDB, com acesso restrito apenas a usuários autorizados.

### Prioridade
Alta

## [RNF003] Usabilidade

### Descrição
A interface do usuário deve ser intuitiva e fácil de usar, facilitando o carregamento de modelos .obj e a atribuição de pacientes e médicos.

### Critérios de Aceitação
1. O processo de carregamento de modelos .obj deve ser simples e direto, com instruções claras para o usuário.
2. A atribuição de pacientes e médicos deve ser feita de forma rápida e sem complicações, com feedback claro sobre o sucesso da operação.

### Prioridade
Média

## [RNF004] Confiabilidade

### Descrição
O sistema deve ser altamente confiável, garantindo a disponibilidade e integridade dos dados em todos os momentos.

### Critérios de Aceitação
1. O sistema deve ter uma taxa de disponibilidade de pelo menos 99,9%, excluindo períodos de manutenção programada.
2. Os dados dos usuários e dos modelos carregados devem ser protegidos contra perda ou corrupção, com backups regulares realizados para garantir a recuperação em caso de falha.

### Prioridade
Alta
