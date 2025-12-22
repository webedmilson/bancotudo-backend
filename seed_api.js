const BASE_URL = 'http://localhost:3000';

async function main() {
  try {
    console.log('--- Iniciando Teste via API ---');

    // 1. Criar Cliente
    console.log('1. Criando Cliente...');
    const clienteRes = await fetch(`${BASE_URL}/cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Maria Souza',
        cpf: '999.888.777-66',
        email: 'maria.souza@email.com',
        telefone: '11988888888'
      })
    });
    
    if (!clienteRes.ok) {
        const err = await clienteRes.text();
        throw new Error(`Falha ao criar cliente: ${err}`);
    }
    const cliente = await clienteRes.json();
    console.log('   Cliente criado:', cliente.id, cliente.nome);

    // 2. Criar Conta
    console.log('2. Criando Conta...');
    const contaRes = await fetch(`${BASE_URL}/conta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: '54321-0',
        tipo: 'CORRENTE',
        clienteId: cliente.id,
        saldo: 0
      })
    });

    if (!contaRes.ok) {
        const err = await contaRes.text();
        throw new Error(`Falha ao criar conta: ${err}`);
    }
    const conta = await contaRes.json();
    console.log('   Conta criada:', conta.id, conta.numero);

    // 3. Depositar 500
    console.log('3. Realizando Depósito de 500...');
    const depositoRes = await fetch(`${BASE_URL}/transacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contaId: conta.id,
        tipo: 'CREDITO',
        valor: 500,
        descricao: 'Depósito API'
      })
    });

    if (!depositoRes.ok) {
        const err = await depositoRes.text();
        throw new Error(`Falha ao depositar: ${err}`);
    }
    const deposito = await depositoRes.json();
    console.log('   Depósito OK:', deposito.id);

    // 4. Sacar 100
    console.log('4. Realizando Saque de 100...');
    const saqueRes = await fetch(`${BASE_URL}/transacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contaId: conta.id,
        tipo: 'DEBITO',
        valor: 100,
        descricao: 'Saque API'
      })
    });

    if (!saqueRes.ok) {
        const err = await saqueRes.text();
        throw new Error(`Falha ao sacar: ${err}`);
    }
    const saque = await saqueRes.json();
    console.log('   Saque OK:', saque.id);

    // 5. Verificar Saldo Final (Consultando a Conta)
    console.log('5. Verificando Saldo Final...');
    const contaFinalRes = await fetch(`${BASE_URL}/conta/${conta.id}`);
    const contaFinal = await contaFinalRes.json();
    
    console.log('--- Resumo Final ---');
    console.log(`Cliente: ${cliente.nome}`);
    console.log(`Conta: ${contaFinal.numero}`);
    console.log(`Saldo Esperado: 400`);
    console.log(`Saldo Real: ${contaFinal.saldo}`);

  } catch (error) {
    console.error('ERRO NO TESTE:', error);
  }
}

main();
