'use client';

import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    Button, 
    Typography, 
    Box, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CloseIcon from '@mui/icons-material/Close';

interface TabHistoryItem {
    id: number;
    code: string;
    value: number;
    date: string;
    status: string;
}

interface TabsHistoryModalProps {
    open: boolean;
    onClose: () => void;
    tabsHistory: TabHistoryItem[];
}

export function TabsHistoryModal({ open, onClose, tabsHistory }: TabsHistoryModalProps) {
    const getStatusColor = (status: string) => {
        if (status.includes('Bônus')) return 'secondary';
        if (status === 'Resgatado') return 'success';
        return 'primary';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ zIndex: 1500 }}>
            <DialogTitle sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                bgcolor: 'primary.main', 
                color: 'white' 
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListAltIcon sx={{ mr: 1 }} />
                    HISTÓRICO DE TABS CADASTRADAS
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ py: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    Aqui está o histórico completo de todas as TABS que você cadastrou no sistema.
                </Typography>

                {tabsHistory.length > 0 ? (
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'background.default' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Código TAB</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Data</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tabsHistory.map((item) => (
                                    <TableRow key={item.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" fontFamily="monospace">
                                                {item.code}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography 
                                                variant="body1" 
                                                fontWeight="bold"
                                                color={item.status.includes('Bônus') ? 'secondary.main' : 'primary.main'}
                                            >
                                                + R$ {item.value.toFixed(2).replace('.', ',')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {new Date(item.date).toLocaleDateString('pt-BR')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={item.status}
                                                color={getStatusColor(item.status)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 6,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        border: '2px dashed',
                        borderColor: 'primary.main'
                    }}>
                        <ListAltIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                            Nenhuma TAB cadastrada ainda
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Comece a cadastrar seus códigos TAB para acumular saldo no seu Gift Card!
                        </Typography>
                    </Box>
                )}

                {tabsHistory.length > 0 && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Total de TABS cadastradas:</strong> {tabsHistory.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Valor total acumulado:</strong> R$ {tabsHistory.reduce((sum, item) => sum + item.value, 0).toFixed(2).replace('.', ',')}
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}