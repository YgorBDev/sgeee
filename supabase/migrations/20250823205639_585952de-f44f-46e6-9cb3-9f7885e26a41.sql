-- Atualizar as políticas RLS para permitir leitura pública dos dados

-- Desabilitar RLS temporariamente ou criar políticas que permitam acesso público
DROP POLICY IF EXISTS "Estoque can be viewed by authenticated users" ON estoque;
DROP POLICY IF EXISTS "Materiais can be viewed by authenticated users" ON materiais;
DROP POLICY IF EXISTS "Modalidades can be viewed by authenticated users" ON modalidades;

-- Criar políticas que permitem leitura pública
CREATE POLICY "Estoque can be viewed by everyone" 
ON estoque 
FOR SELECT 
USING (true);

CREATE POLICY "Materiais can be viewed by everyone" 
ON materiais 
FOR SELECT 
USING (true);

CREATE POLICY "Modalidades can be viewed by everyone" 
ON modalidades 
FOR SELECT 
USING (true);