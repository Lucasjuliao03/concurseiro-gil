// Script para testar conquistas
// Execute no console do navegador ou use em um componente de debug

const TEST_ACHIEVEMENT_ID = 'first_question';

async function testAchievements() {
  console.log('=== Teste de Conquistas ===');
  
  // 1. Verificar se a tabela existe
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Erro ao acessar tabela user_achievements:', error);
    console.log('Possíveis problemas:');
    console.log('1. A tabela não foi criada no Supabase');
    console.log('2. O RLS está bloqueando o acesso');
    console.log('3. O nome da tabela está incorreto');
    return;
  }
  
  console.log('✅ Tabela user_achievements acessível');
  
  // 2. Verificar usuário atual
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.log('⚠️ Nenhum usuário logado');
    return;
  }
  console.log('✅ Usuário logado:', user.id);
  
  // 3. Inserir uma conquista de teste
  console.log('Tentando inserir conquista de teste...');
  
  const { error: insertError } = await supabase
    .from('user_achievements')
    .insert({
      user_id: user.id,
      achievement_id: TEST_ACHIEVEMENT_ID,
      unlocked_at: new Date().toISOString(),
      notification_shown: false,
    });
  
  if (insertError) {
    console.error('❌ Erro ao inserir conquista:', insertError);
    return;
  }
  
  console.log('✅ Conquista inserida com sucesso!');
  
  // 4. Verificar conquistas do usuário
  const { data: achievements, error: fetchError } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', user.id);
  
  if (fetchError) {
    console.error('❌ Erro ao buscar conquistas:', fetchError);
    return;
  }
  
  console.log('✅ Conquistas do usuário:', achievements);
  console.log(`Total: ${achievements.length} conquistas`);
  
  // 5. Deletar conquista de teste
  await supabase
    .from('user_achievements')
    .delete()
    .eq('user_id', user.id)
    .eq('achievement_id', TEST_ACHIEVEMENT_ID);
  
  console.log('✅ Conquista de teste removida');
  console.log('=== Teste Completo ===');
}

// Para executar, cole no console do navegador:
// testAchievements()

export { testAchievements };
