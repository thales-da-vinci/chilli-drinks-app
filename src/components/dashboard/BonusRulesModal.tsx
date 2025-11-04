import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

interface BonusRulesModalProps {
  open: boolean;
  onClose: () => void;
}

export function BonusRulesModal({ open, onClose }: BonusRulesModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>Regras de Bônus</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <ul>
            <li><strong>Bônus Extra:</strong> A cada <strong>10 Códigos TABS</strong> cadastrados e em espera, você ganha um <strong>bônus extra de R$15,00</strong> (valor simulado).</li>
            <li><strong>Resgate:</strong> O bônus é adicionado ao seu saldo no momento do resgate do Gift Card.</li>
            <li><strong>Limite:</strong> Você pode ganhar este bônus uma única vez por ciclo de resgate.</li>
            <li><strong>Foco:</strong> O sistema incentiva o cadastro em lote.</li>
          </ul>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}