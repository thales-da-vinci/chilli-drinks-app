# 📋 Lista de TABs para Teste (Mock Database)

## ⚠️ IMPORTANTE
As TABs são geradas aleatoriamente a cada inicialização do MSW. Para ver as TABs atuais:
1. Abra o DevTools (F12)
2. Vá para Console
3. Procure por: "MSW: TABs disponíveis:"

## 🔍 Como Inspecionar no Navegador

### LocalStorage Keys:
- `CHILLI_USERS_MOCK_KEY` - Lista de usuários registrados
- `CHILLI_CURRENT_USER_KEY` - Usuário logado
- `CHILLI_TABS_[CPF]` - TABs resgatadas por usuário

### Exemplo de TABs Geradas (12 dígitos, sem 'O'):

#### ✅ TABs DISPONÍVEIS (30 unidades - R$ 1,00 cada):
```
A1B2C3D4E5F6
G7H8I9J1K2L3
M4N5P6Q7R8S9
T1U2V3W4X5Y6
Z7A8B9C1D2E3
P4Q5R6S7T8U9
V1W2X3Y4Z5A6
B7C8D9E1F2G3
H4I5J6K7L8M9
N1P2Q3R4S5T6
U7V8W9X1Y2Z3
A4B5C6D7E8F9
G1H2I3J4K5L6
M7N8P9Q1R2S3
T4U5V6W7X8Y9
Z1A2B3C4D5E6
F7G8H9I1J2K3
L4M5N6P7Q8R9
S1T2U3V4W5X6
Y7Z8A9B1C2D3
E4F5G6H7I8J9
K1L2M3N4P5Q6
R7S8T9U1V2W3
X4Y5Z6A7B8C9
D1E2F3G4H5I6
J7K8L9M1N2P3
Q4R5S6T7U8V9
W1X2Y3Z4A5B6
C7D8E9F1G2H3
I4J5K6L7M8N9
```

#### ❌ TABs JÁ RESGATADAS (10 unidades):
```
P1Q2R3S4T5U6
V7W8X9Y1Z2A3
B4C5D6E7F8G9
H1I2J3K4L5M6
N7P8Q9R1S2T3
U4V5W6X7Y8Z9
A1B2C3D4E5F7
G8H9I1J2K3L4
M5N6P7Q8R9S1
T2U3V4W5X6Y7
```

#### 🚫 TABs INVÁLIDAS (10 unidades - R$ 0,00):
```
Z8A9B1C2D3E4
F5G6H7I8J9K1
L2M3N4P5Q6R7
S8T9U1V2W3X4
Y5Z6A7B8C9D1
E2F3G4H5I6J7
K8L9M1N2P3Q4
R5S6T7U8V9W1
X2Y3Z4A5B6C7
D8E9F1G2H3I4
```

## 🧪 Cenários de Teste

### Teste 1: Resgate Bem-Sucedido
- Use qualquer TAB da lista "DISPONÍVEIS"
- Resultado esperado: Status 201, TAB adicionada à lista do usuário

### Teste 2: TAB Já Resgatada
- Use qualquer TAB da lista "JÁ RESGATADAS"
- Resultado esperado: Status 409, mensagem "Este código TAB já foi utilizado"

### Teste 3: TAB Inválida
- Use qualquer TAB da lista "INVÁLIDAS"
- Resultado esperado: Status 404, mensagem "Código TAB inválido"

### Teste 4: Resgate Duplicado
- Resgat uma TAB disponível
- Tente resgatar a mesma TAB novamente
- Resultado esperado: Status 409, mensagem "Você já resgatou este código TAB"

## 📊 Distribuição
- **Total**: 50 TABs
- **Disponíveis**: 30 (60%)
- **Resgatadas**: 10 (20%)
- **Inválidas**: 10 (20%)
